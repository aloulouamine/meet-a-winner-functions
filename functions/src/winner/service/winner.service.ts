import {MeetupService} from '../../meetup/service/meetup.service';
import {Exception} from '../../shared/domain/exception';
import {ShakerService} from '../../shared/service/shaker.service';
import {Tweet} from '../../twitter/domain/tweet';
import {TwitterService} from '../../twitter/service/twitter.service';
import {RsvpToWinnerConverter} from '../converter/rsvp-to-winner.converter';
import {TweetToWinnerConverter} from '../converter/tweet-to-winner.converter';
import {Winner} from '../domain/winner';

/**
 * Manage interactions with {@link Winner}.
 */
export class WinnerService {

    private twitterService = new TwitterService();
    private meetupService = new MeetupService();
    private tweetToWinnerConverter = new TweetToWinnerConverter();
    private rsvpToWinnerConverter = new RsvpToWinnerConverter();
    private shakerService = new ShakerService();

    /**
     * Get a {@link Winner} randomly over multiple platform.
     * @param {string} Id of a {@link Tweet}
     * @param {string} Id of a {@link Meetup}
     * @returns {Promise<Winner>}
     */
    public getRandomlyAWinner(tweetId: string, meetupId: string): Promise<Winner> {
        const twitterPromise = this.getRandomlyAWinnerFromTwitter(tweetId);
        const meetupPromise = this.getRandomlyAWinnerFromMeetup(meetupId);

        return new Promise(
            (resolve: (value: Winner) => void, reject: (reason: Exception) => void): void => {
                Promise.all([twitterPromise, meetupPromise])
                    .then(winners => resolve(this.shakerService.getRandom(winners)))
                    .catch(err => reject(err));
            }
        );
    }

    /**
     * Get a {@link Winner} randomly over Twitter platform.
     * @param {string} Id of a {@link Tweet}
     * @returns {Promise<Winner>}
     */
    public getRandomlyAWinnerFromTwitter(tweetId: string): Promise<Winner> {
        return new Promise(
            (resolve: (value: Winner) => void, reject: (reason: Exception) => void): void => {
                this.twitterService.getRetweetsOfATweet(tweetId)
                    .then(tweets => {
                        if (tweets.length === 0) {
                            reject(new Exception(`No retweet found for tweet ${tweetId}`));
                        }

                        const tweet = this.shakerService.getRandom(tweets);
                        resolve(this.tweetToWinnerConverter.convert(tweet));
                    })
                    .catch(err => reject(err));
            }
        );
    }

    /**
     * Get a {@link Winner} randomly over Meetup platform.
     * @param {string} Id of a {@link Meetup}
     * @returns {Promise<Winner>}
     */
    public getRandomlyAWinnerFromMeetup(meetupId: string): Promise<Winner> {
        return new Promise(
            (resolve: (value: Winner) => void, reject: (reason: Exception) => void): void => {
                this.meetupService.getRsvpsOfAMeetup(meetupId)
                    .then(rsvps => {
                        if (rsvps.length === 0) {
                            reject(new Exception(`No yes RSVPs found for meetup ${meetupId}`));
                        }

                        const rsvp = this.shakerService.getRandom(rsvps);
                        resolve(this.rsvpToWinnerConverter.convert(rsvp));
                    })
                    .catch(err => reject(err));
            }
        );
    }

}