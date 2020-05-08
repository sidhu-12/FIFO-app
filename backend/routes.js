
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
const config=require("./config.json");
const con=mysql.createConnection(config.connection);
const nodemailer=require("nodemailer");
const request=require("request");
app.listen(process.env.PORT||3000, () => {
  console.log("Listening on localhost:3000");
});

con.connect(function(error) {
  if (error) console.log(error);
  else console.log("connected");
});

app.post("/conf", function(req, res) {
  con.query(`SELECT * FROM import_req where username='${req.body.username}' and accepted=1 and arrival_date is null`, function(error, results) {
    //con.query(`Call conf_req(?)`,[req.body.username], function(error, results) {
  if (error) throw error;
    //console.log(results);
    res.send(results);
  });
});
app.get("/abc", function(req, res) {
  let transporter = nodemailer.createTransport({
    host: 'smtpout.asia.secureserver.net',
    port: 465,
    secure: true,
    auth: {
      user:"noreply@fifofuture.in",
      pass:"vReply@123"
    }
});
var mail_content='<b>From</b>: noreply@fifofuture.in [mailto:noreply@fifofuture.in]<br/><b>Sent</b>: '+new Date()+'<br/><b>To</b>: magesh.balasekaran@fifofuture.in<br/><b>Subject</b>: Cnee : Container arrival notice at factory<br/><br/><br/><br/><label style="font-size:large;font-family:\'Times New Roman\', Times, serif;"><b>Dear Consignee: DEMO CONSIGNEE 1 we are pleased to confirm arrival of the container No: MSKU0788222 at your factory. Contact truck driver Name & Mobile No:(Madavan & 9884667337).</b></label><br/>Regards,<br/>Welcome Team,<br/>fifofuture.in<br/><div style="height: 10px;background-color: grey;"></div><br/><b>Note</b>: This is an auto generated mail please do not reply to this mail. To contact us or send any feedback, please mail us at: fifoadmin@fifofuture.in';
console.log(mail_content)
let mailOptions = {
    from: 'noreply@fifofuture.in', 
    to: 'sidharth12899@gmail.com', 
    subject: 'Cnee : Container arrival notice at factory',
    html:mail_content,
  };
console.log(mailOptions);
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    });
  });


app.post("/auth", function(req, res) {
  //const sql=`Call authenticate(?,?)`;
  const sql = `Select * from user_login where username= BINARY '${req.body.username}' and password= BINARY '${req.body.password}'`;
  
  //console.log(sql);
  con.query(sql, function(err, results) {
    if (err) throw err;
    else {
      console.log(results)   
      if (results.length >=1) {res.send("True");}
      else res.send("False");
    }
  });
});
app.post("/rej", function(req, res) {
  const sql = `update import_req set accepted=2 where container_no='${req.body.con_no}'`;
  //console.log(sql);
  con.query(sql, function(err, results) {
    if (err) throw err;
     res.send("done");
  });
});
app.post("/driver_details", function(req, res) {
  const sql = `insert into driver_details (container_no,driver_name,mobile_number,truck_no,round_trip) values
  ('${req.body.container_no}','${req.body.name}','${req.body.mob_no}','${req.body.truck_no}','${req.body.round_trip}') `;
  //const sql=`Call driver_details_insertion(?,?,?,?,?)`;
  //console.log(sql);
  const sql1 = `update import_req set accepted=1 where container_no='${req.body.container_no}'`;
  //r;console.log(sql);
  con.query(sql1, function(err, results) {
    if (err) throw err;});
  con.query(sql,function(err, results) {
    if (err) throw err;
     res.send("done");
  });
});
app.post("/req", function(req, res) {
  con.query(`SELECT * FROM import_req where username='${req.body.username}' and accepted=0 and arrival_date is NULL`, function(error, results,) {
    if (error) throw error;
    res.send(results);
    /*con.query(`Call notification_req(?)`,[req.body.username] ,function(error, results) {
      if (error) throw error;
      //console.log(results);
      res.send(results);*/
  });
});
app.post("/driv", function(req, res) {
  con.query(`SELECT * FROM driver_details where container_no='${req.body.container_no}'`, function(error, results,) {
    if (error) throw error;
    res.send(results);
  });
});
app.post("/date", function(req, res) {
  const sql = `update import_req set arrival_date='${req.body.actualDate}' , arrival_time='${req.body.actualTime}' where container_no='${req.body.con_no}'`;
  //console.log(sql);
  con.query(sql, function(err, results) {
    if (err) throw err;
     res.send("done");
  });
});
app.post("/history", function(req, res) {
  const sql = `Select *,DATEDIFF(CURRENT_DATE(),dop) as diff from import_req where DATEDIFF(CURRENT_DATE(),dop)<30 and username='${req.body.username}' and accepted=1 and arrival_date <>'0000-00-00'`;
  //console.log(sql);
  con.query(sql, function(err, results) {
    if (err) throw err;
    let response=[];
    response.push(results);
    response.push(config.contact);
    console.log(response);
    res.send(response);
  });
});