const nodemailer = require("nodemailer");


// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async function (email, subject, message) {

//create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,  // true for 465, false for other ports
      auth: {

        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD

      }
    });


    // send mail with defined transport object
    await transporter.sendMail({
       from: '"Fred Foo 👻" <foo@example.com>', // sender address
       to: email, // list of receivers
       subject: subject, // Subject line
       html: message, // html body
    
     });
}


export default sendEmail;
