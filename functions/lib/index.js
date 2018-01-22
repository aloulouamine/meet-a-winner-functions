"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const exception_1 = require("./shared/domain/exception");
const user_timeline_parameter_1 = require("./twitter/domain/user-timeline-parameter");
const twitter_service_1 = require("./twitter/service/twitter.service");
const winner_service_1 = require("./winner/service/winner.service");
exports.getLastTweetsOfGDGLille = functions.https.onRequest((request, response) => {
    const tokenId = request.get('Authorization').split('Bearer ')[1];
    admin.auth().verifyIdToken(tokenId)
        .then(() => {
        const params = new user_timeline_parameter_1.UserTimelineParameter();
        params.screen_name = 'GDG Lille';
        const twitterService = new twitter_service_1.TwitterService();
        twitterService.getUserTimeline(params)
            .then((tweets) => response.send(tweets))
            .catch((err) => response.status(500).send(err));
    })
        .catch((err) => response.status(401).send(new exception_1.Exception('Not authorized')));
});
exports.getRandomlyAWinner = functions.https.onRequest((request, response) => {
    const tweetId = request.query.tweetId || response.status(400).send(new exception_1.Exception('Missing id of tweet in the request.'));
    const winnerService = new winner_service_1.WinnerService();
    winnerService.getRandomlyAWinner(tweetId)
        .then((winner) => response.send(winner))
        .catch((err) => response.status(500).send(err));
});
//# sourceMappingURL=index.js.map