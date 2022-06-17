var express = require('express');
const app = require('../app');
var router = express.Router();
var dbConnect = require("../database/connect");

/* GET home page. */
router.get('/', function(req, res, next) {
  dbConnect.query("SELECT * FROM student", function(err, data) {
    if(err) throw err;
    res.render('index', {data:data});
  });
});


//-------------Postman---------------
router.get('/api',(req,res)=>{
  //sql
  let sql = `SELECT * FROM student`;
  //run
  dbConnect.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result);
  });
    
});

//--------------------------------------------
//GET ID
router.get('/api/add/:id',(req,res)=>{
  console.log(req.params.id);
  // sql query 
  let sql = `SELECT * FROM student
              WHERE id = '${req.params.id}'
              `;
  // run query 
  dbConnect.query(sql,(err,result)=>{
      if(err) throw err;
      res.send(result);
  });          
});
//----------------------------------------------

//them hoc sinh moi

router.get("/add",function(req,res){
  res.render("add");
});
//POST
router.post("/add",function(req,res){
  dbConnect.query(`INSERT INTO student (name,email,mssv,class) VALUES('${req.body.name}','${req.body.email}','${req.body.mssv}','${req.body.class}')`,function(err){
    if(err) throw err;
    res.redirect("/")
  })
});



//------------Postman-------------------
router.post('/api/add',(req,res)=>{
  console.log(req.body);
  // sql query 
  let sql = `INSERT INTO student(id, name, email, mssv, class)
              VALUES'${req.body.name}','${req.body.email}','${req.body.mssv}','${req.body.class}'`;
  // run query 
  dbConnect.query(sql,(err,result)=>{
          if(err) throw err;
          res.send('data inserted');
  });        
});
//----------------------------------



//DELETE

router.get("/delete/:id", function(req, res){
  dbConnect.query(`DELETE FROM student WHERE id=${req.params.id}`, function(err){
    if(err) throw err;
    res.redirect("/")
  })
});

//-------------API Postman-----------------------
router.delete('/api/delete/:id',(req,res)=>{

  // sql query 
  let sql = `DELETE FROM student 
              WHERE id = '${req.params.id}'
              `;
  //    run query 
  dbConnect.query(sql,(err,result)=>{
      if(err) throw err;
      res.send('data deleted');
  });         
});
//------------------------------------------------


router.get("/edit/:id",function(req,res){
  var data = dbConnect.query(`SELECT * FROM student WHERE id=${req.params.id}`, function(err,result){
    if(err) throw err;
    data = {
      id:result[0].id,
      name:result[0].name,
      email:result[0].email,
      mssv:result[0].mssv,
      class:result[0].class
    }
    res.render("edit",{data});
  })
});

//CAP NHAT
router.post("/edit",function(req,res){
  dbConnect.query(`UPDATE student SET name='${req.body.name}',email='${req.body.email}',mssv='${req.body.mssv}',class='${req.body.class}'WHERE id = '${req.body.id}'`,function(err){
    if(err) throw err;
    res.redirect("/");
  })
})


//-----------Postman------------------
router.put('/api/edit/:id',(req,res)=>{
  console.log(req.params.id);
  // sql query 
  let sql = `UPDATE student SET name='${req.body.name}',email='${req.body.email}',mssv='${req.body.mssv}',class='${req.body.class}' WHERE id = '${req.body.id}'`;
  // run query 
  dbConnect.query(sql,(err,result)=>{
          if(err) throw err;
          res.send('data updated');
  })            
})
//-----------------------------------

module.exports = router;
