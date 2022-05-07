import * as https from 'https';
import { BackUpResponse } from './models';
import mocksApi1 from '../../../mocksdata/mocksapi1backup.json';
import mocksApi2 from '../../../mocksdata/mocksapi2backup.json';

class UsersBackUpService {

    /**
     * Get external data for backup
     * @param url 
     * @returns {Promise<BackUpResponse>} A promise that contains users data 
     */
    getDataUsers(url: string): Promise<BackUpResponse> {

        // uncomment if limit exceeded requests 
        // const dataMocks: BackUpResponse = url.split('/').pop() === 'api1' ? mocksApi1 : mocksApi2;
        // return Promise.resolve(dataMocks);

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