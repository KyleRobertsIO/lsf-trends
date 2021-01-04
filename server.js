//########################################################################
// General module imports
//########################################################################
require('dotenv').config()
const cron = require('node-cron')
const { NewPostCron } = require("./src/crons/RequestCrons");
const { PostRatingService } = require('./src/services/PostRatingService');
const { MailerService } = require('./src/services/MailerService')

//########################################################################
// Express configurations
//########################################################################

// import modules
const express = require('express')
const cors = require('cors');

const app = express();
const port = process.env.port || 55555;
app.use(cors("*"))

//########################################################################
// Server variables
//########################################################################
let newPostArray = []
let emailedPosts = new Set()

//########################################################################
// Endpoint configuration
//########################################################################
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
})

app.get('/posts/new', (req, res) => {
    res.send(newPostArray);
})

//########################################################################
// Startup of Express web server
//########################################################################
app.listen(port, () => {
    console.log(`Sub Reddit post monitor listening at http://localhost:${port}`)
    runNewPostJob() // Initial run of new post job
  })

//########################################################################
// Cron job section
//########################################################################

// Job to clear memory of post ids
cron.schedule('* * 1-31/2 * *', () => {
    emailedPosts = new Set()
})

// Start new post cron job
cron.schedule('0-59/5 * * * *', () => {
    runNewPostJob()
})

// Modular function to run new post job
function runNewPostJob() {
    const postRatingService = new PostRatingService()
    const mailerService = new MailerService("gmail")
    NewPostCron()
    .then((posts) => {
        newPostArray = posts
        // Handle post analysis
        newPostArray.forEach((post) => {
            if (emailedPosts.has(post.id)) { return }
            if(postRatingService.AnalyzePostCandidate(post)) {
                const emailOptions = {
                    from: 'pogoochampooclips@gmail.com',
                    to: 'kkroberts1635@gmail.com',
                    subject: `${post.title}`,
                    text: `${post.reddit_link}`
                }
                // Send email about post
                mailerService.SendEmail(emailOptions)
                // Write that post was emailed
                emailedPosts.add(post.id)
            }
        })
    })
    .catch((err) => {
        console.log(err)
        newPostArray = err
    })
}