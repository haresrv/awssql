const express= require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );
const url = require('url');


const app=express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());

var mysql = require('mysql');
 
const s3 = new aws.S3({
 accessKeyId: 'ASIAX62GXFY3TJUGWBQB',
 secretAccessKey: 'ogTBg2o3h9Ka2VtVSfxXX31YMdqibOuxEZcgcZUT',
 sessionToken:'FQoGZXIvYXdzEKv//////////wEaDJqUNL3QziF6t5YqHSKWAsWrQKrhFjhfI1o5Q/4o/PRBqo18eW65Q3dXOB2uw9FGT1GOBNCuKTQFV57zcVATyHQ5kwArFrTMEmTOPDPDsHaoCYMu8hqNpUT5qxu7Dor9hsT3bNQlodewgZf3pIpJ/PmvJUihgNlgvwnikjjrFkxwgKL+ilJQHgc3bO5/KJvaAz49EWNjteFxBDMBHOItsb+NpdH0GCXIZXQ3U9jMUHLp+OLnAQFj6rRryRvI2+jsA7z87QRYwRtHBd00PASfFWT93yIubnL5wmwDQwPBG/4Cx6xXv2DVddRtvJIeVz/LkrewPbIGPfQzOSk8DsGitVnp5h6rZRhGY8WhH0/aRnsipEMjoiJ4iEoVjB8vf2AYuLAC4xjgKKTKjusF',
 Bucket: 'cloud337'
});

//console.log(s3);

// let config = {
//     user: process.env.SQL_USER,
//     database: process.env.SQL_DATABASE,
//     password: process.env.SQL_PASSWORD,
// }

// if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
//   config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
// }

// let connection = mysql.createConnection(config);




// create a connection variable with the required details


function checkFileType( file, cb ){
 // Allowed ext
 const filetypes = /jpeg|jpg|png|gif/;
 // Check ext
 const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
 // Check mime
 const mimetype = filetypes.test( file.mimetype );
if( mimetype && extname ){
  return cb( null, true );
 } else {
  cb( 'Error: Images Only!' );
 }
}

const profileImgUpload = multer({
 storage: multerS3({
  s3: s3,
  bucket: 'cloud337',
  // acl: 'public-read',
  key: function (req, file, cb) {
   cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
  }
 }),
 limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
 fileFilter: function( req, file, cb ){
  checkFileType( file, cb );
 }
}).single('profileImage');




app.get('*',(req,res)=>{
  res.json('OK');
})


app.post('/img',(req,res)=>{

profileImgUpload( req, res, ( error ) => {
  // console.log( 'requestOkokok', req.file );
  // console.log( 'error', error );
  if( error ){
   console.log( 'errors', error );
   res.json( { error: error } );
  } else {
   // If File not found
   if( req.file === undefined ){
    console.log( 'Error: No File Selected!' );
    res.json( 'Error: No File Selected' );
   } else {
    // If Success
    const imageName = req.file.key;
    const imageLocation = req.file.location;
// Save the file name into database into profile model
    res.json( {
     image: imageName,
     location: imageLocation
    } );
   }
  }
 });


});

app.post('/',(req,res)=>{



var con = mysql.createConnection({
  host: "rand.c02gbtm2eqhm.us-east-1.rds.amazonaws.com", // ip address of server running mysql
  //host:"34.67.178.8",
  user:"master", // user name to your mysql database
  password:"password", // corresponding password
  database: "cloud337" // use the specified database
});
 
// make to connection to the database.
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  con.query("Select * from evaluation", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) 
      {
        console.log('error');
        throw err;

      }
      console.log('ITS OK');
    // if there is no error, you have the fields object
    // iterate for all the rows in fields object
    Object.keys(result).forEach(function(key) {
      var res = result[key];
 //     console.log(res)
    });
  });
});



  var {seldate,days,country,states}=req.body;
 // console.log(name);
 //console.log(req.body);
    var today = new Date();
    var date3 = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();

    var date1 = new Date(date3); 
    var date2 = new Date(seldate);
   
const diffTime = (date2.getTime() - date1.getTime());
var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
// console.log(diffDays-1);
diffDays=diffDays-1;

console.log(diffDays>=30);
console.log(diffDays+"<0-->"+(diffDays<0)); 
 if(diffDays>=30)
 {
console.log(diffDays); 

   const abc={
    res:"Error",
    error:"Date within 30 days from today"
   }
   res.json(JSON.stringify(abc));

 }

 else if(diffDays<0)
 {
  console.log(diffDays); 

   const abc={
    res:"Error",
    error:"Date shouldn't be before today"
   }
   res.json(JSON.stringify(abc));

 }

else
{

  var xtra="";
  var records = [[req.body.seldate,req.body.days,req.body.country,req.body.states]];
//console.log(records)
if(records[0][0]!=null)
{
  con.query("INSERT INTO evaluation (seldate,days,country,states) VALUES ?", [records], function (err, result, fields) {
    if (err) console.log(err.sqlMessage);
   
   const abc={
    res:result,
    error:err
   }
   res.json(JSON.stringify(abc));

  });

}
}


});

app.listen(3001,()=>{
  console.log("Port 3001");
})
