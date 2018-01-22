"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ShakerService {
    getRandom(items) {
        const idx = Math.floor(Math.random() * items.length);
        return items[idx];
    }
}
exports.ShakerService = ShakerService;
//# sourceMappingURL=shaker.service.js.map