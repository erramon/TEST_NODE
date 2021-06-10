
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


export class jsonUtils extends constUtils {

    jsonUrl(api: any) {
        const url = this.conf.API_MOCS[`${api}`].url; ////API_MOCS url => https://mocks.free.beeceptor.com/api1
        return url;
    }

    fileName(api: any){
        const nameFile = `${this.env}.${api}`;
        return nameFile;
    }

}




