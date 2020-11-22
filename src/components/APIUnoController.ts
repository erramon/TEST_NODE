var request = require('request');
const main = require('../utils/main');
const url = main.entorno.API_MOCS.api1;

import { Request, Response } from 'express';

class APIUnoController {
    public async index(req: Request, res: Response) {
        request(url,
            function (error: any, response: { statusCode: number; body: any; }, body: string) {
                if (!error && response.statusCode == 200) {
                    response = JSON.parse(body);
                    res.send(response);
                } else {
                    console.log(response.statusCode + response.body);
                }
            });
    }
}

export const apiUno = new APIUnoController();
