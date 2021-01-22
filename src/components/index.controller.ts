import { Request, Response } from 'express';
import axios from 'axios';

import { csvHelper } from '../helpers/csv.helper';

class IndexController {
    public async index(req: Request, res: Response) {
        try {
            const resp = await axios.get(process.env[req.query.api.toString()]);
            await csvHelper.writeCSV(req.query.api.toString(), resp.data.items);
            res.status(200).send({ message: 'Los datos se procesaron correctamente' });
        } catch (err) {
            res.status(400).send({ ...err });
        }
    }
}

export const indexController = new IndexController();
