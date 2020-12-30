const express = require('express')
const axios = require('axios');
const app = express()
const port = 55555

let newPostArray = []
queryNewPosts()
.then((posts) => {
    newPostArray = posts
})


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
})

app.get('/posts/new', (req, res) => {
    res.send(newPostArray);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function queryNewPosts(){
    return new Promise((resolve, reject) => {
        axios.get('https://www.reddit.com/r/LivestreamFail/new.json?sort=new')
        .then((res) => {
            const posts = res.data.data.children
            let postList = [];
            posts.forEach(post => {
                const postContent = post.data
                const postModel = {
                    title: postContent.title,
                    ups: postContent.ups,
                    thumbnail_url: postContent.thumbnail_url,
                    media_domain_url: postContent.media_domain_url
                }
                postList.push(postModel);
            })
            console.log(`Query collected ${postList.length} posts`);
            // Sort post list
            postList = postList.sort((postA, postB) => {
                return (postA.ups < postB.ups ? 1 : -1)
            })

            resolve(postList)
        })
        .catch((err) => {
            reject(null)
        })
    })
}