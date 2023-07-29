import nodemailer from "nodemailer";


// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async function (email, subject, message) {

  console.log(process.env.SMTP_USERNAME, process.env.SMTP_PASSWORD);

//create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {

        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD

      }
    });


    // send mail with defined transport object
    await transporter.sendMail({
       from: process.env.SMTP_FROM_EMAIL, // sender address
       to: email, // list of receivers
       subject: subject, // Subject line
       html: message, // html body
    
     });
}


export default sendEmail;
