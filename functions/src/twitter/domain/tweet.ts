import {Tweople} from './tweople';

export class Tweet {

    constructor(public id_str?: number,
                public user?: Tweople,
                public text?: string,
                public created_at?: Date) {
    }

}