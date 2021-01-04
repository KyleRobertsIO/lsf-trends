class RedditPost {

    constructor(
        id,
        title,
        ups,
        created,
        thumbnail_url,
        media_domain_url,
        reddit_link
    ) {
        this.id = id
        this.title = title
        this.ups = ups
        this.created = created
        this.thumbnail_url = thumbnail_url
        this.media_domain_url = media_domain_url
        this.reddit_link = reddit_link
    }

}
module.exports.RedditPost = RedditPost