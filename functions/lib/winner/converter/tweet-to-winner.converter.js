"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winner_1 = require("../domain/winner");
class TweetToWinnerConverter {
    convert(tweet) {
        const winner = new winner_1.Winner();
        winner.id = tweet.user.id;
        winner.name = tweet.user.name;
        winner.image = tweet.user.profile_image_url_https;
        return winner;
    }
}
exports.TweetToWinnerConverter = TweetToWinnerConverter;
//# sourceMappingURL=tweet-to-winner.converter.js.map