import * as functions from 'firebase-functions';
import {Exception} from './shared/domain/exception';
import {UserTimelineParameter} from './twitter/domain/user-timeline-parameter';
import {TwitterService} from './twitter/service/twitter.service';
import {WinnerService} from './winner/service/winner.service';

export const getLastTweetsOfGDGLille = functions.https.onRequest((request, response) => {
    const params = new UserTimelineParameter();
    params.screen_name = 'GDG Lille';

    const twitterService = new TwitterService();
    twitterService.getUserTimeline(params)
        .then((tweets) => response.send(tweets))
        .catch((err) => response.status(500).send(err));
});

export const getRandomlyAWinner = functions.https.onRequest((request, response) => {
    const tweetId = request.query.tweetId || response.status(400).send(new Exception('Missing id of tweet in the request.'));

    const winnerService = new WinnerService();
    winnerService.getRandomlyAWinner(tweetId)
        .then((winner) => response.send(winner))
        .catch((err) => response.status(500).send(err));
});


