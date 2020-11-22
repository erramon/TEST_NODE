import API_MOCS  from './../config/dev.json'
import { Request, Response } from 'express';

class Main {
    public async index(req: Request, res: Response) {
        if (process.env.NODE_ENV === 'dev') {
            res.json(API_MOCS);
        }
    }
}

export const main = new Main();
