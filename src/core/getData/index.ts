import { get } from 'https';

import { Data } from '../../models/data.model';
import utils from '../../utils';

export default class GetData {

    private api: string;

    constructor( api: string ) {
        this.api = api;
    }

    private get getUrl(): string {
        return utils.config.getApiMocs[this.api]['url']
    }

    public download(): Promise< Data > {
        return new Promise((resolve, reject) => {
            
            get(this.getUrl, res => {
                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', () => {
                    resolve(JSON.parse(rawData))
                })
            })
        })
    }
}