import * as cors from 'cors';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import {MeetupService} from './meetup/service/meetup.service';
import {Exception} from './shared/domain/exception';
import {SearchParameter} from './twitter/domain/search-parameter';
import {TwitterService} from './twitter/service/twitter.service';
import {WinnerService} from './winner/service/winner.service';

admin.initializeApp(functions.config().firebase);

function getToken(request): Promise<admin.auth.DecodedIdToken> {
    return new Promise<admin.auth.DecodedIdToken>(
        (resolve: (value: admin.auth.DecodedIdToken) => void, reject: (reason: Exception) => void): void => {
            const regex = new RegExp('^Bearer (.*)');

            if (!request.headers.authorization || !regex.test(request.headers.authorization)) {
                reject(new Exception('Missing bearer token in the headers request.'));
            }

            admin.auth().verifyIdToken(regex.exec(request.headers.authorization)[1])
                .then(decodedIdToken => resolve(decodedIdToken))
                .catch(() => reject(new Exception('User unknown.')));
        });
}

/**
 * Retrieve the last 10 tweets of GDG Lille.
 * @return Array<Tweet>>
 *
 * @protected
 * @type {HttpsFunction}
 */
export const getLastTweetsOfGDGLille = functions.https.onRequest((request, response) => {
    cors({origin: functions.config().cors.origin})(request, response, () => {
        getToken(request)
            .then(() => {
                const params = new SearchParameter();
                params.q = '-filter:retweets from:GDGLille';

                const twitterService = new TwitterService();
                twitterService.getSearch(params)
                    .then((tweets) => response.send(tweets))
                    .catch((err) => response.status(500).send(err));
            })
            .catch(err => response.status(403).send(err));
    });
});

/**
 * Retrieve the last 10 meetups of GDG Lille.
 * @return Array<Meetup>
 *
 * @protected
 * @type {HttpsFunction}
 */
export const getLastMeetupsOfGDGLille = functions.https.onRequest((request, response) => {
    cors({origin: functions.config().cors.origin})(request, response, () => {
        getToken(request)
            .then(() => {
                const meetupService = new MeetupService();
                meetupService.getEvents('GDG-Lille')
                    .then((meetups) => response.send(meetups))
                    .catch((err) => response.status(500).send(err))
            })
            .catch(err => response.status(403).send(err))
    });
});

/**
 * Find a winner randomly.
 * @param ID of a {@link Tweet}
 * @return Winner
 *
 * @protected
 * @type {HttpsFunction}
 */
export const getRandomlyAWinner = functions.https.onRequest((request, response) => {
    cors({origin: functions.config().cors.origin})(request, response, () => {
        getToken(request)
            .then(() => {
                const tweetId = request.query.tweetId;
                const meetupId = request.query.meetupId;

                if (tweetId === undefined && meetupId === undefined) {
                    response.status(400).send(new Exception('Required either id of a tweet or id of a meetup in the request.'));
                }

                const winnerService = new WinnerService();
                let promise = undefined;

                if (tweetId !== undefined && meetupId === undefined) {
                    promise = winnerService.getRandomlyAWinnerFromTwitter(tweetId);
                } else if (tweetId === undefined && meetupId !== undefined) {
                    promise = winnerService.getRandomlyAWinnerFromMeetup(meetupId);
                } else {
                    promise = winnerService.getRandomlyAWinner(tweetId, meetupId);
                }

                promise
                    .then((winner) => response.send(winner))
                    .catch((err) => response.status(500).send(err));
            })
            .catch(err => response.status(403).send(err));
    });
});


