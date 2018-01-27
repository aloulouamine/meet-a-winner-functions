import {Converter} from '../../shared/converter/converter';
import {Tweet} from '../../twitter/domain/tweet';
import {Winner} from '../domain/winner';

/**
 * Manage the conversion between a {@link Tweet} and a {@link Winner}.
 */
export class TweetToWinnerConverter implements Converter<Tweet, Winner> {

    /**
     * Converts a {@link Tweet} into a {@link Winner}.
     * @param {Tweet} tweet
     * @returns {Winner}
     */
    public convert(tweet: Tweet): Winner {
        const winner = new Winner();
        winner.id = tweet.user.id;
        winner.name = tweet.user.name;
        winner.image = tweet.user.profile_image_url_https;

        return winner;
    }

}