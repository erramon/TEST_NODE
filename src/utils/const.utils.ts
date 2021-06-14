export class constUtils {
    env: string;
    conf: any;
    maxRecords: number;

    constructor() {
        this.env = process.env.NODE_ENV; // environment -> dev
        this.conf = require(`../config/${this.env}.json`); // file.json
        this.maxRecords = 998; // file lines
    }

}

