import * as https from 'https';
import { BackUpResponse } from './models';
import * as path from 'path';
import * as fs from 'fs';

class UsersBackUpService {

    /**
     * Get external data for backup
     * @param url
     * @returns {Promise<BackUpResponse>} A promise that contains users data
     */
    getDataUsers(url: string): Promise<BackUpResponse> {

        // uncomment if limit exceeded requests
        // const api = url.split('/').pop();
        // const mock = path.join(__dirname, `../../../mocksdata/mocks${api}backup.json`);
        // let dataResponse: BackUpResponse;

        // try {
        //     const data = fs.readFileSync(mock, 'utf8');
        //     dataResponse = JSON.parse(data);
        // } catch {
        //     console.error('Error get data to mocks')
        // }

        // return Promise.resolve(dataResponse);

        return new Promise((resolve, reject) => {
            https.get(url, resp => {
                const body: any = [];
                resp.on('data', (chunk) => body.push(chunk));
                resp.on('end', () => {
                    try {
                        const data = JSON.parse(body.join(''))
                        resolve(data);
                    } catch (err) {
                        reject(err);
                    }
                });
            }).on('error', (err) => {
                reject(err);
            });
        });
    }

}

export const usersBackUpService = new UsersBackUpService();
