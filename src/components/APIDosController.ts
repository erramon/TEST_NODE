var request = require('request');
const main = require('../utils/main');
const url = main.entorno.API_MOCS.api2;
const csvjson = require('csvjson');
const fs = require('fs')

import { Request, Response } from 'express';

class APIDosController {
    public async index(req: Request, res: Response) {
        request(url,
            function (error: any, response: { statusCode: number; body: any; }, body: string) {
                if (!error && response.statusCode == 200) {
                    const json = JSON.parse(body).slice(0,999);
                    const csvData = csvjson.toCSV(json, {
                        headers: 'key'
                    });
                    if (fs.existsSync(__dirname + '/outputs/apiDos.csv')) {
                        fs.unlinkSync(__dirname + '/outputs/apiDos.csv');
                        fs.rmdirSync(__dirname + '/outputs/');
                    }
                    if (fs.existsSync(__dirname + '/outputs/')) {
                        fs.rmdirSync(__dirname + '/outputs/');
                    }
                    fs.mkdirSync(__dirname + '/outputs/')
                    const dir = __dirname + '/outputs/';
                    fs.writeFile(dir + 'apiDos.csv', csvData, (err: any) => {
                        // throws an error, you could also catch it here
                        if (err) throw err;

                        // success case, the file was saved
                        console.log('File saved!');
                    });
                    res.send(response);
                } else {
                    console.log(response.statusCode + response.body);
                }
            });
    }
}

export const apiDos = new APIDosController();
