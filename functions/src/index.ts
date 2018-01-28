import * as cors from 'cors';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
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
 * Retrieve the last 15 tweets of GDG Lille.
 * @return Array<Tweet>>
 *
 * @protected
 * @type {HttpsFunction}
 */
export const getLastTweetsOfGDGLille = functions.https.onRequest((request, response) => {
    cors({origin: true})(request, response, () => {
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
 * Find a winner randomly.
 * @param ID of a {@link Tweet}
 * @return Winner
 *
 * @protected
 * @type {HttpsFunction}
 */
export const getRandomlyAWinner = functions.https.onRequest((request, response) => {
    cors({origin: true})(request, response, () => {
        getToken(request)
            .then(() => {
                const tweetId = request.query.tweetId || response.status(400).send(new Exception('Missing id of tweet in the request.'));

                const winnerService = new WinnerService();
                winnerService.getRandomlyAWinner(tweetId)
                    .then((winner) => response.send(winner))
                    .catch((err) => response.status(500).send(err));
            })
            .catch(err => response.status(403).send(err));
    });
});


