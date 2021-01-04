require('dotenv').config()

const { MailerService } = require('./src/services/MailerService')

const emailService = new MailerService("gmail")
const emailOptions = {
    from: 'pogoochampooclips@gmail.com',
    to: 'kkroberts1635@gmail.com',
    subject: 'Clip name here',
    text: 'Body of email.'
}
emailService.SendEmail(emailOptions);