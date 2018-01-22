"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserTimelineParameter {
    constructor(screen_name, exclude_replies = true, include_rts = false) {
        this.screen_name = screen_name;
        this.exclude_replies = exclude_replies;
        this.include_rts = include_rts;
    }
}
exports.UserTimelineParameter = UserTimelineParameter;
//# sourceMappingURL=user-timeline-parameter.js.map