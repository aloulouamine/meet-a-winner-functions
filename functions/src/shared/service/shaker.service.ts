export class ShakerService {

    public getRandom(items: Array<any>): any {
        const idx = Math.floor(Math.random() * items.length);
        return items[idx];
    }

}