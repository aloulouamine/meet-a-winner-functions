import {Exception} from '../../shared/domain/exception';
import {ShakerService} from '../../shared/service/shaker.service';
import {Tweet} from '../../twitter/domain/tweet';
import {TwitterService} from '../../twitter/service/twitter.service';
import {TweetToWinnerConverter} from '../converter/tweet-to-winner.converter';
import {Winner} from '../domain/winner';

export class WinnerService {

    private twitterService = new TwitterService();
    private tweetToWinnerConverter = new TweetToWinnerConverter();
    private shakerService = new ShakerService();

    public getRandomlyAWinner(tweetId: number): Promise<Winner> {
        const twitterPromise = this.twitterService.getRetweetsOfATweet(tweetId);

        return new Promise(
            (resolve: (value: Winner) => void, reject: (reason: Exception) => void): void => {
                Promise.all([twitterPromise])
                    .then((values) => {
                        resolve(this.getRandomlyAWinnerFromTwitter(values[0]));
                    })
                    .catch((err) => reject(err));
            }
        );
    }

    public getRandomlyAWinnerFromTwitter(tweets: Array<Tweet>): Winner {
        const tweet = this.shakerService.getRandom(tweets);
        return this.tweetToWinnerConverter.convert(tweet);
    }

}