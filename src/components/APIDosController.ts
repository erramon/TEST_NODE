import path from "path";
var request = require('request');
const main = require('../utils/main');
const url = main.entorno.API_MOCS.api2;
const csvjson = require('csvjson');
const writeFile = require('fs').writeFile;
const mkdirSync = require('fs').mkdirSync


import { Request, Response } from 'express';

class APIDosController {
    public async index(req: Request, res: Response) {
        request(url,
            function (error: any, response: { statusCode: number; body: any; }, body: string) {
                if (!error && response.statusCode == 200) {
                    //response = JSON.parse(body);
                    const json = JSON.parse(body);
                    const csvData = csvjson.toCSV(json, {
                        headers: 'key'
                    });
                    mkdirSync(path.join(__dirname, '/outputs/apiDos.csv'), function(err: any) {
                        if (err) console.error(err)
                        else console.log(`Carpeta files/ creada con exito.`)
                    })

                    writeFile(__dirname + '/outputs/apiDos.csv', csvData, (err: any) => {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("The file was saved!");
                    });
                    res.send(response);
                } else {
                    console.log(response.statusCode + response.body);
                }
            });
    }
}

export const apiDos = new APIDosController();
