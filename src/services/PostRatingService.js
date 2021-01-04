class PostRatingService {

    constructor() {}

    // Return true for quality post
    AnalyzePostCandidate(redditPost) {
        if (redditPost.ups >= 300) {
            return true
        }
        return false
    }

}
module.exports.PostRatingService = PostRatingService