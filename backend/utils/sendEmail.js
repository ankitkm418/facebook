const nodemailer = require("nodemailer");

const sendMail = async (email, sub, text) =>{
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 587,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            },
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: sub,
            text: text
        });

        console.log("Email sent successfully");
    } 
    catch(err){
        console.log(Error  + "Email not sent");
    }
}

module.exports = sendMail;