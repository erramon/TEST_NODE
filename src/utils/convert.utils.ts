import { constUtils } from '../utils/const.utils';

const fs = require("fs");
const converter = require("json-2-csv");
//const papa = require('papaparse');

export class csvConverter {

    public async converterData (json: any, nameFile: string, dir: string) {
        let data = await converter.json2csvAsync(json); //json-2-csv
        //let data = await papa.unparse(json); // papaparse
        await this.jsonToCsv(data, nameFile, dir);
    }

    public async jsonToCsv (csv: any, nameFile: string, dir: string):Promise <number> {
        const max: number = new constUtils().maxRecords; // get the number of lines

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