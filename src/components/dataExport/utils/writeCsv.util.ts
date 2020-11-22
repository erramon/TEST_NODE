import fs from 'fs';
import { getEndpoint } from '../../../utils/getEndpoint.util';
import { Data } from '../entities/data.model';
import { ExportReport } from '../entities/export-report.model';

export async function writeCsv(data: Data, apiName: string): Promise<ExportReport> {
    let items = 0;
    let files = 1;
    
    while(items <= data.items.length) { 
        let rows: string[] = [];

        for (let row = 0; row < 999; row++) {
            if (data.items[items]) {
                rows.push(Object.values(data.items[items]).join('; '));
            }
            items++;
        }

        await writeRows(rows, apiName, files);
        files++;

    }

    return new ExportReport({
        originApi: getEndpoint(apiName),
        outDir: './outputs/' + apiName,
        files: files - 1,
        lines: data.items.length
    });
}

async function writeRows(rows: string[], apiName: string, filenumber: number) {
    const month = new Date().toLocaleString('en-US', {  month: 'long' }).toLowerCase();
    
    fs.writeFile('src/outputs/' + apiName + '/' + apiName + '_export_' + month + '_' + filenumber + '.csv', rows.join('\n'), (error: NodeJS.ErrnoException) => {
        if (error) {
            console.error(error);
        }
    });
}
