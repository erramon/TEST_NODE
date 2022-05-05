import { Request, Response } from 'express';
import { BackUpResponse, User } from './model';
import * as https from 'https';
import HandlerFilesUtil from '../../utils/handlerFiles';
import mocksApi1 from '../../../mocksdata/mocksapi1backup.json';
import mocksApi2 from '../../../mocksdata/mocksapi2backup.json';

class UsersBackUpController {

    async createBackupDataApi(req: Request, res: Response) {
        const error = new Error();
        const apiParams = req.query.api.toString();
        const apiUrl = process.env[apiParams];
        const path = `src/outputs/${apiParams}`;

        try {
            if (!apiUrl) {
                throw error;
            }
            await HandlerFilesUtil.cleanDirectory(path);
            const usersBackUpString = await this.resquestToApi(apiUrl);
            const usersBackUp: BackUpResponse = JSON.parse(usersBackUpString);
            
            // uncomment if exced limit request to apis
            // const usersBackUp: BackUpResponse = apiParams === 'api1' ? mocksApi1 : mocksApi2;

            const blocks = await this.createBlocks(usersBackUp, path);

            if (blocks) {
                res.status(204).send();
            } else {
                res.status(400).send({ message: 'error' });
            }

        } catch (err) {
            console.error(`Error get data to api ${apiUrl}` + err);
            res.status(400).send({ message: 'error' });
        }
    }

    createBlocks(data: BackUpResponse, path: string): Promise<any[]> {
        const promises: any = [];
        const MAX_LINES_BLOCK = 999;
        let block = 1;
        let dataBlock: any = [];

        data.items.forEach((user: User) => {
            dataBlock.push(Object.values(user));
            if (dataBlock.length === MAX_LINES_BLOCK) {
                promises.push(HandlerFilesUtil.writeFile(`${path}/backup${block}.csv`, dataBlock.join('\n')));
                block++;
                dataBlock = [];
            }
        });
        
        return Promise.all(promises);
    }

    resquestToApi(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            https.get(url, resp => {
                const body: any = [];
                resp.on('data', (chunk) => body.push(chunk));
                resp.on('end', () => resolve(body.join('')));
            }).on("error", (err) => {
                reject(err);
            });
        });
    }
}

export const usersBackUpController =  new UsersBackUpController();