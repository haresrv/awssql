const express= require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const app=express();
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(bodyParser.json());
app.use(cors());

var mysql = require('mysql');
 
// create a connection variable with the required details
var con = mysql.createConnection({
  host: "instance1.c02gbtm2eqhm.us-east-1.rds.amazonaws.com", // ip address of server running mysql
  user: "master", // user name to your mysql database
  password: "password", // corresponding password
  database: "cloud337" // use the specified database
});
 
// make to connection to the database.
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  con.query("Select * from student", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) 
      {
        console.log('error');
        throw err;

      }
      console.log('OK');
    // if there is no error, you have the fields object
    // iterate for all the rows in fields object
    Object.keys(result).forEach(function(key) {
      var res = result[key];
 //     console.log(res)
    });
  });
});





app.get('/',(req,res)=>{
  res.json('OK');
})


app.post('/',(req,res)=>{
  var {name,rollno}=req.body;
 // console.log(name);
 // console.log(rollno);
  
  res.json(name);

  var records = [[req.body.name,req.body.rollno]];

if(records[0][0]!=null)
{
  con.query("INSERT INTO student (name,rollno) VALUES ?", [records], function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
  });

}

})


app.listen(3001,()=>{
  console.log("Port 3001");
})
