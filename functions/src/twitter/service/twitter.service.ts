import * as functions from 'firebase-functions';
import {Exception} from '../../shared/domain/exception';
import {Tweet} from '../domain/tweet';
import {Twitter} from 'twitter-node-client';
import {UserTimelineParameter} from '../domain/user-timeline-parameter';

export class TwitterService {

    private twitterClient: any;

    constructor() {
        this.twitterClient = new Twitter({
            consumerKey: functions.config().twitter.consumer.key,
            consumerSecret: functions.config().twitter.consumer.secret,
            accessToken: functions.config().twitter.access.token,
            accessTokenSecret: functions.config().twitter.access['token-secret'],
            callBackUrl: functions.config().twitter['call-back-url']
        });
    }

    public getUserTimeline(params: UserTimelineParameter): Promise<Array<Tweet>> {
        return new Promise(
            (resolve: (value: Array<Tweet>) => void, reject: (reason: Exception) => void): void => {

                this.twitterClient.getUserTimeline(params,
                    (err) => {
                        console.error(err);
                        reject(new Exception(`Error retrieving tweet(s) of ${params.screen_name} from the Twitter platform.`));
                    },
                    (data) => {
                        const tweets = JSON.parse(data).map((tweet) => <Tweet> tweet);
                        resolve(tweets);
                    });

            });
    }

    public getRetweetsOfATweet(id: number): Promise<Array<Tweet>> {
        return new Promise(
            (resolve: (value: Array<Tweet>) => void, reject: (reason: Exception) => void): void => {

                this.twitterClient.getCustomApiCall(`/statuses/retweets/${id}.json`, {},
                    (err) => {
                        console.error(err);
                        reject(new Exception(`Error retrieving retweet(s) of ${id} from the Twitter platform.`));
                    },
                    (data) => {
                        const tweets = JSON.parse(data).map((tweet) => <Tweet> tweet);
                        resolve(tweets);
                    });

            });
    }

}