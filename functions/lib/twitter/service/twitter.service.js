"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const exception_1 = require("../../shared/domain/exception");
const twitter_node_client_1 = require("twitter-node-client");
class TwitterService {
    constructor() {
        this.twitterClient = new twitter_node_client_1.Twitter({
            consumerKey: functions.config().twitter.consumer.key,
            consumerSecret: functions.config().twitter.consumer.secret,
            accessToken: functions.config().twitter.access.token,
            accessTokenSecret: functions.config().twitter.access['token-secret'],
            callBackUrl: functions.config().twitter['call-back-url']
        });
    }
    getUserTimeline(params) {
        return new Promise((resolve, reject) => {
            this.twitterClient.getUserTimeline(params, (err) => {
                console.error(err);
                reject(new exception_1.Exception(`Error retrieving tweet(s) of ${params.screen_name} from the Twitter platform.`));
            }, (data) => {
                const tweets = JSON.parse(data).map((tweet) => tweet);
                resolve(tweets);
            });
        });
    }
    getRetweetsOfATweet(id) {
        return new Promise((resolve, reject) => {
            this.twitterClient.getCustomApiCall(`/statuses/retweets/${id}.json`, {}, (err) => {
                console.error(err);
                reject(new exception_1.Exception(`Error retrieving retweet(s) of ${id} from the Twitter platform.`));
            }, (data) => {
                const tweets = JSON.parse(data).map((tweet) => tweet);
                resolve(tweets);
            });
        });
    }
}
exports.TwitterService = TwitterService;
//# sourceMappingURL=twitter.service.js.map