const axios = require('axios')
const { RedditPost } = require('../models/RedditPost')

class RedditService {

    constructor(subReddit) {
        this.sub_reddit = subReddit
    }
 
    RequestNewPosts(){
        return new Promise((resolve, reject) => {
            const URI = `https://www.reddit.com/r/${this.sub_reddit}/new.json?sort=new`
            axios.get(URI)
            .then((res) => {
                const posts = res.data.data.children
                let postList = [];
                posts.forEach(post => {
                    const postContent = post.data
                    try {
                        const redditPost = new RedditPost(
                            postContent.id,
                            postContent.title,
                            postContent.ups,
                            postContent.created_utc,
                            postContent.media.oembed.thumbnail_url,
                            postContent.secure_media_embed.media_domain_url,
                            `https://reddit.com/${postContent.permalink}`
                        )
                        postList.push(redditPost);
                    }catch(error) {
                        console.log(`[Problematic Post] ${postContent.title}`);
                    }
                })
                console.log(`Query collected ${postList.length} posts`);
                // Sort post list
                postList = postList.sort((postA, postB) => {
                    return (postA.ups < postB.ups ? 1 : -1)
                })
                resolve(postList)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

}
module.exports.RedditService = RedditService