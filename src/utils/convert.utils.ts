import { constUtils } from '../utils/const.utils';
import { createDir } from '../utils/dir.utils';

const fs = require("fs");

export class csvConverter {

    public async jsonToCsv (csv: any):Promise <number> {

        const max: number = new constUtils().maxRecords;
        const nameFile: string = new constUtils().env;
        const dir: string = new createDir().checkExistsOrCreate(`src/output/`, (new constUtils().env));
        
        //if (err) throw err;
        const headers = csv.split('\n').slice(0, 1);
        const records = csv.split('\n').slice(0,);

        for (let i = 1; i < records.length; i = i + max) {
            let dataOut = headers.concat(records.slice(i, i + max)).join('\n');
            let id = Math.floor(i / max) + 1;
            fs.writeFileSync(`${dir}/${nameFile}.${id}.csv`, dataOut);
        }

        return Promise.resolve(csv);

    };

}

