import nodemailer from 'nodemailer';
function sendMail(email,password){
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'paylpatel5544@gmail.com',
    pass: 'mnlz yreh iwnv zyxt'
  }
});

var mailOptions = {
  from: 'paylpatel5544@gmail.com',
  to: 'paylpatel5544@gmail.com',
  subject: 'verify your account',
  html:"<h1>Welcome to Faculty Forum</h1><p> you have successfull registered to our site,your login credentials are attached below</p><h2>Email:"+email+"</h2><h2>Password:"+password+"</h2><h1>click on the link below to verify your account</h1>http://localhost:3000/verify/"+email

};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}

export default sendMail;