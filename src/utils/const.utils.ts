export class constUtils {
    env: string;
    conf: any;
    maxRecords: number;

    constructor() {
        this.env = process.env.NODE_ENV;
        this.conf = require(`../config/${this.env}.json`);
        this.maxRecords = 998;
    }

}

