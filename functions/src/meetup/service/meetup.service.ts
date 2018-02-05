import * as functions from 'firebase-functions';
import * as MeetupApi from 'meetup-api';
import {Exception} from '../../shared/domain/exception';
import {Meetup} from '../domain/meetup';
import {Rsvp} from '../domain/rsvp';

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
     * @param {Array<String>} status
     * @param {boolean} descending
     * @returns {Promise<Array<Meetup>>}
     */
    public getEvents(groupUrlName: string, status: Array<String> = ['upcoming'], descending: boolean = false): Promise<Array<Meetup>> {
        return new Promise(
            (resolve: (value: Array<Meetup>) => void, reject: (reason: Exception) => void): void => {

                this.meetupClient.getEvents({group_urlname: groupUrlName, status: status.join(','), desc: descending},
                    (err, data) => {
                        if (err) {
                            reject(new Exception(`Error retrieving event(s) from group ${groupUrlName} from the Meetup platform.`));
                        }

                        const meetups = data.results.map(meetup => <Meetup>meetup);
                        resolve(meetups);
                    });

            });
    }

    /**
     * Retrieve a list of {@link Rsvp} via the id of a {@link Meetup}.
     * @param {string} Id of a {@link Meetup}
     * @param {string}
     * @returns {Promise<Array<Rsvp>>}
     */
    public getRsvpsOfAMeetup(meetupId: string, rsvpType: string = "yes"): Promise<Array<Rsvp>> {
        return new Promise(
            (resolve: (value: Array<Rsvp>) => void, reject: (reason: Exception) => void): void => {

                this.meetupClient.getRSVPs({event_id: meetupId, rsvp: rsvpType},
                    (err, data) => {
                        if (err) {
                            reject(new Exception(`Error retrieving rsvp(s) from meetup ${meetupId} from the Meetup platform.`));
                        }

                        const rsvps = data.results.map(rsvp => <Rsvp>rsvp);
                        resolve(rsvps);
                    });

            });
    }

}