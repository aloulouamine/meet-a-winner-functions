export class Meetup {

    constructor(public id?: string,
                public name?: string,
                public rsvp_limit?: number,
                public yes_rsvp_count?: number,
                public time?: Date) {
    }

}