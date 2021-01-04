const chalk = require('chalk');
const nodemailer = require('nodemailer')

class MailerService {

    constructor(emailService) {
        this.email_service = emailService
        // Transporter method
        this.transporter = nodemailer.createTransport({
            service: this.email_service,
            auth: {
                user: process.env.email_user,
                pass: process.env.email_pass
            }
        })
    }

    SendEmail(mailOptions) {
        this.transporter.sendMail(mailOptions, function(err, info) {
            if(err) {
                console.log(chalk.red("[EMAIL FAILURE]"))
                console.log(chalk.red(err))
            }else{
                console.log(`${chalk.green("[Email Sent]")} ${mailOptions.subject}`);
            }
        })
    }

}
module.exports.MailerService = MailerService