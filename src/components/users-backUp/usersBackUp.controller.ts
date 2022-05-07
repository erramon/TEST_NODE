import { Request, Response } from 'express';
import { CONSTANTS } from '../../common/constants';
import { usersBackUpUtils } from './usersBackUp.utils';

class UsersBackUpController {

    async createBackupByApi(req: Request, res: Response) {
        const error = new Error();
        const api = req.query.api as string;
        const apiUrl = process.env[api];

        try {
            if (!apiUrl) {
                error.message = CONSTANTS.BAD_REQUEST_ERROR;
                throw error;
            }

            const isCreatedBackUp = await usersBackUpUtils.createBackup(apiUrl, api);            
            
            if (!isCreatedBackUp) {                
                error.message = CONSTANTS.SERVER_ERROR;
                throw error;
            } else {
                res.status(204).send();
            }

        } catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    }

}

export const usersBackUpController = new UsersBackUpController(); 




