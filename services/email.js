require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async(recieverEmail, subject, message) => {
    try{
        const msg = {
            to: recieverEmail,
            from: 'info@zulfahgroup.com', 
            subject: subject,
            text:message,
           };
       await sgMail.send(msg)
        

    }catch(error){
        console.log(error)
    }
}

const sendEmailWithHtml = () => { 

}

module.exports = {
    sendEmail,
    sendEmailWithHtml
}