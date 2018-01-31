import * as functions from 'firebase-functions';
import {Twitter} from 'twitter-node-client';
import {Exception} from '../../shared/domain/exception';
import {SearchParameter} from '../domain/search-parameter';
import {Tweet} from '../domain/tweet';

/**
 * Manage interactions with Twitter platform.
 */
export class TwitterService {

    private twitterClient: any;

    constructor() {
        this.twitterClient = new Twitter({
            consumerKey: functions.config().twitter.consumer.key,
            consumerSecret: functions.config().twitter.consumer.secret,
            accessToken: functions.config().twitter.access.token,
            accessTokenSecret: functions.config().twitter.access.token_secret,
            callBackUrl: functions.config().twitter.call_back_url
        });
    }

    /**
     * Retrieve a list of {@link Tweet} via some {@link SearchParameter}.
     * @param {SearchParameter} params
     * @returns {Promise<Array<Tweet>>}
     */
    public getSearch(params: SearchParameter): Promise<Array<Tweet>> {
        return new Promise(
            (resolve: (value: Array<Tweet>) => void, reject: (reason: Exception) => void): void => {

                this.twitterClient.getSearch(params,
                    (err) => {
                        console.error(err);
                        reject(new Exception(`Error retrieving tweet(s) from query ${params.q} from the Twitter platform.`));
                    },
                    (data) => {
                        const tweets = JSON.parse(data).statuses.map(tweet => <Tweet> tweet);
                        resolve(tweets);
                    });

            });
    }

    /**
     * Retrieve a list of re{@link Tweet} associated to a specific {@link Tweet}.
     * @param {string} Id of the root {@link Tweet}
     * @returns {Promise<Array<Tweet>>}
     */
    public getRetweetsOfATweet(tweetId: string): Promise<Array<Tweet>> {
        return new Promise(
            (resolve: (value: Array<Tweet>) => void, reject: (reason: Exception) => void): void => {

                this.twitterClient.getCustomApiCall(`/statuses/retweets/${tweetId}.json`, {},
                    (err) => {
                        console.error(err);
                        reject(new Exception(`Error retrieving retweet(s) of tweet ${tweetId} from the Twitter platform.`));
                    },
                    (data) => {
                        const tweets = JSON.parse(data).map(tweet => <Tweet> tweet);
                        resolve(tweets);
                    });

            });
    }

}