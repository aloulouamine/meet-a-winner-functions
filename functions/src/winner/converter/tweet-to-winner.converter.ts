import {Tweet} from '../../twitter/domain/tweet';
import {Winner} from '../domain/winner';
import {Converter} from '../../shared/converter/converter';

export class TweetToWinnerConverter implements Converter<Tweet, Winner> {

    public convert(tweet: Tweet): Winner {
        const winner = new Winner();
        winner.id = tweet.user.id;
        winner.name = tweet.user.name;
        winner.image = tweet.user.profile_image_url_https;

        return winner;
    }

}