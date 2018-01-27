/**
 * Manage the shaker.
 */
export class ShakerService {

    /**
     * Extract an item form an array randomly.
     * @param {Array<any>} items
     * @returns {any}
     */
    public getRandom(items: Array<any>): any {
        const idx = Math.floor(Math.random() * items.length);
        return items[idx];
    }

}