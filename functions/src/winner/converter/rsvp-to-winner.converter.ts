import {Rsvp} from '../../meetup/domain/rsvp';
import {Converter} from '../../shared/converter/converter';
import {Winner} from '../domain/winner';

/**
 * Manage the conversion between a {@link Rsvp} and a {@link Winner}.
 */
export class RsvpToWinnerConverter implements Converter<Rsvp, Winner> {

    /**
     * Converts a {@link Rsvp} into a {@link Winner}.
     * @param {Rsvp} rsvp
     * @returns {Winner}
     */
    public convert(rsvp: Rsvp): Winner {
        const winner = new Winner();
        winner.id = rsvp.member.member_id;
        winner.name = rsvp.member.name;
        winner.from = 'Meetup';

        if (rsvp.member_photo !== undefined) {
            winner.profile_image = rsvp.member_photo.thumb_link;
            winner.background_image = rsvp.member_photo.highres_link;
        }

        return winner;
    }

}