import * as functions from 'firebase-functions';
import * as MeetupApi from 'meetup-api';
import {Exception} from '../../shared/domain/exception';
import {Meetup} from '../domain/meetup';

/**
 * Manage interactions with Meetup platform.
 */
export class MeetupService {

    private meetupClient: any;

    constructor() {
        this.meetupClient = new MeetupApi({
            key: functions.config().meetup.api_key
        });
    }

    /**
     * Retrieve a list of {@link Meetup} via the url name of the group.
     * @param {string} groupUrlName
     * @returns {Promise<Array<Meetup>>}
     */
    public getEvents(groupUrlName: string): Promise<Array<Meetup>> {
        return new Promise(
            (resolve: (value: Array<Meetup>) => void, reject: (reason: Exception) => void): void => {

                this.meetupClient.getEvents({group_urlname: groupUrlName},
                    (err, data) => {
                        if (err) {
                            reject(new Exception(`Error retrieving event(s) from group ${groupUrlName} from the Meetup platform.`));
                        }

                        const meetups = data.results.map(meetup => <Meetup>meetup);
                        resolve(meetups);
                    });

            });
    }

}