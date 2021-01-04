const { RedditService } = require('../services/RedditService')


function NewPostCron() {
    return new Promise((resolve, reject) => {
        const redditService = new RedditService("LivestreamFail")
        redditService.RequestNewPosts()
        .then((posts) => {
            resolve(posts)
        })
        .catch((err) => {
            console.log(err)
            reject([])
        })
    })
}
module.exports.NewPostCron = NewPostCron