export class UserTimelineParameter {

    constructor(public screen_name?: string,
                public exclude_replies: boolean = true,
                public include_rts: boolean = false) {
    }

}