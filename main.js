const axios = require('axios');

main()

function main(){
    axios.get('https://www.reddit.com/r/LivestreamFail/new.json?sort=new')
    .then((res) => {
        const posts = res.data.data.children
        posts.forEach(post => {
            const postContent = post.data
            console.log(`\n\n${postContent.title}\nUp Votes: ${postContent.ups}`);
        })
    })
}