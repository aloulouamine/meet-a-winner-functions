"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shaker_service_1 = require("../../shared/service/shaker.service");
const twitter_service_1 = require("../../twitter/service/twitter.service");
const tweet_to_winner_converter_1 = require("../converter/tweet-to-winner.converter");
class WinnerService {
    constructor() {
        this.twitterService = new twitter_service_1.TwitterService();
        this.tweetToWinnerConverter = new tweet_to_winner_converter_1.TweetToWinnerConverter();
        this.shakerService = new shaker_service_1.ShakerService();
    }
    getRandomlyAWinner(tweetId) {
        const twitterPromise = this.twitterService.getRetweetsOfATweet(tweetId);
        return new Promise((resolve, reject) => {
            Promise.all([twitterPromise])
                .then((values) => {
                resolve(this.getRandomlyAWinnerFromTwitter(values[0]));
            })
                .catch((err) => reject(err));
        });
    }
    getRandomlyAWinnerFromTwitter(tweets) {
        const tweet = this.shakerService.getRandom(tweets);
        return this.tweetToWinnerConverter.convert(tweet);
    }
}
exports.WinnerService = WinnerService;
//# sourceMappingURL=winner.service.js.map