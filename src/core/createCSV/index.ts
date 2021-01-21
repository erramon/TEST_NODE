import { parseAsync } from 'json2csv';
import { writeFile } from 'fs';
import { join } from 'path';

import { Data, Row } from '../../models/data.model';
import GetData from '../getData';
import utils from '../../utils';

export default class CreateCSV {

    private data: Data;
    private api: string;
    private readonly MAX_ROWS = 999;
    private fileNumber = 0;

    constructor(api: string) {
        this.api = api;
    }

    public async start(): Promise<void> {
        await this.downloadData();
        await this.generateFiles();
    }

    private async downloadData(): Promise<void> {
        const getData = new GetData(this.api);
        this.data = await getData.download();
    }

    private async generateFiles(): Promise<void> {
        let items: Row[] = this.data['items'];

        while (!!items.length) {
            const section = items.slice(0, this.MAX_ROWS);
            await this.createFile(section);
            this.fileNumber++
            items = items.splice(this.MAX_ROWS, items.length);
        }
    }

    private createFile(section: Row[]): Promise<void> {
        return new Promise((resolve, reject) => {
            parseAsync(section, {})
                .then(csv => writeFile(join(utils.folder.patchCsvFolder, `${this.fileNumber}.csv`), csv, (err) => {
                    resolve(null);
                }))
                .catch(err => console.error(err));

        })

    }

}