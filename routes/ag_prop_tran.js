var express = require('express');
var router = express.Router();
var mysql = require('mysql');  
 
 
 
var con = mysql.createConnection({  
  host: '35.213.189.162',
  user: 'urkgr9wtuqha6',
  password: 'password@123',
  database: 'db3ic80zkfi89v'
});  
con.connect(function(err) {  
  if (err) throw err;  
  console.log("Connected!");  
});  
 
 
 router.get('/:thing',function(req,res){
      console.log(req.url);
      var user = req.session.user;
      if(user == null){
        res.redirect("/login");
        return;
     }
      var d = req.params.thing;
      if(d==="rent") 
      {
        var user = req.session.user;
        con.query("select TR_ID,Start_Date,END_DATE,t.ID,t.P_ID,rent,Bedroom,Address,t.B_ID from property p ,rent_details t where p.ID=t.P_ID and t.ID ="+user.ID,(err, agnt) => {
          var user = req.session.user;
        res.render("ag_prop_tran.ejs",{user : user, userData : agnt ,tit : "Rented Properties", flag : 2 });
       }); 
      }
      if(d==="sale") 
      {
        var user = req.session.user;
        con.query("select TS_ID,s_date,t.ID,t.P_ID,Sell_price,Bedroom,Address,t.B_ID from property p ,sale_details t where p.ID=t.P_ID and t.ID ="+user.ID,(err, agnt) => {
          var user = req.session.user;
        res.render("ag_prop_tran.ejs",{user : user, userData : agnt , tit : "Sold Properties", flag : 1});
       });
      }
 
   
  });
 
 
  router.post('/sale',function(req,res){
    var user =  req.session.user;
    if(user == null){
      res.redirect("/login");
      return;
   }
    var mx = req.body.max_price;
    var mn = req.body.min_price;
    var ad = req.body.addres;
    var sd = req.body.date;
    var b = req.body.Bedroom;
    var by = req.body.bid;
    var str = "select TS_ID,s_date,t.ID,t.P_ID,sell_price,Bedroom,Address,t.B_ID from property p ,sale_details t where p.ID=t.P_ID and t.ID ="+user.ID;
    console.log(req.body);
    if(mx.length>0)
      { str = str + " and t.sell_price <="+Number(mx);}
    if(mn.length>0)
      { str = str + " and t.sell_price >="+Number(mn);}
    if(ad.length>0)
      { str = str + " and Address like '%"+ad+"%'";}
    if(sd.length>0)
      { str = str + " and s_date = '"+sd+"'";}
    if(b.length>0)
      { str = str + " and Bedroom ="+Number(b);}
      if(by.length>0)
      { str = str + " and t.B_ID ="+Number(by);}
    
           console.log(str);
    con.query(str,(err, agnt) => {
      var user = req.session.user;
      res.render("ag_prop_tran.ejs",{user : user, userData : agnt , tit : "Sold Properties", flag : 1});
       });
  
  });
 
 
 
router.post('/rent',function(req,res){
    var user =  req.session.user;
    if(user == null){
      res.redirect("/login");
      return;
   }
    var mx = req.body.max_price;
    var mn = req.body.min_price;
    var ad = req.body.addres;
    var sd = req.body.date;
    var b = req.body.bhk;
    var by = req.body.bid;
    
    var str = "select TR_ID,st_date,END_DATE,t.ID,t.P_ID,rent,Bedroom,Address,t.B_ID from property p ,rent_details t where p.ID=t.P_ID and t.ID ="+user.ID;
    console.log(req.body);
    if(mx.length>0)
      { str = str + " and t.rent <="+Number(mx);}
    if(mn.length>0)
      { str = str + " and t.rent >="+Number(mn);}
    if(ad.length>0)
      { str = str + " and Address like '%"+ad+"%'";}
    if(sd.length>0)
      { str = str + " and st_date = '"+sd+"'";}
    if(b.length>0)
      { str = str + " and Bedroom ="+Number(b);}
      if(by.length>0)
      { str = str + " and t.B_ID ="+Number(by);}
    
         
    con.query(str,(err, agnt) => {
      var user = req.session.user;
      res.render("ag_prop_tran.ejs",{user : user, userData : agnt ,tit : "Rented Properties", flag : 2 });
       });
  
  });
  
  setInterval(function(){con.query('select 1');},5000);
module.exports = router;
 

