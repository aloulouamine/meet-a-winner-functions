import * as functions from 'firebase-functions';
import * as meetup from 'meetup-api';
import {Exception} from '../../shared/domain/exception';
import {Meetup} from '../domain/meetup';

/**
 * Manage interactions with Meetup platform.
 */
export class MeetupService {

    private meetupClient: any;

    constructor() {
        this.meetupClient = new meetup({
            key: functions.config().meetup.api_key
        });
    }

    /**
     * Retrieve a list of {@link Meetup} via the id of the group.
     * @param {string} groupId
     * @returns {Promise<Array<Meetup>>}
     */
    public getEvents(groupId: string): Promise<Array<Meetup>> {
        return new Promise(
            (resolve: (value: Array<Meetup>) => void, reject: (reason: Exception) => void): void => {

                this.meetupClient.getEvents({group_id: groupId},
                    (err, data) => {
                        if (err !== undefined) {
                            console.error(err);
                            reject(new Exception(`Error retrieving event(s) from ${groupId} from the Meetup platform.`));
                        }

                        const meetups = JSON.parse(data).map((meetup) => <Meetup> meetup);
                        resolve(meetups);
                    });

            });
    }

}