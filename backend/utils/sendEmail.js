const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator')

const sendMail = async (email, sub, text) =>{
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false
    });

    try{
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            // service: process.env.SERVICE,
            port: 587,
            // secure: true,
            auth: {
                user: 'derick35@ethereal.email',
                pass: 'hNQRKydKzJHJyxgU9b'
            }
        });

        await transporter.sendMail({
            from: "smtp.ethereal.email",
            to: email,
            subject: "OTP for registration is " + otp,
            text: text
        });

        console.log("Email sent successfully");
    } 
    catch(err){
        console.log(Error  + "Email not sent");
    }
}

module.exports = sendMail;
