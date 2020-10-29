/*
    this controller is responsible to join the functions inside "utils" and generate the CSV files corresponding with the API called 

    NOTE: the api called must be specified in any of the json inside the config folder and must be assigne via the .env file. In case of
    wating to add more API just adds more cases to the switch statement with the corresponding actions.
*/
import { cfgLoader } from '../utils/loadCfg';
import { generateFile }  from '../utils/generateFiles'
import { envDetails } from '../interfaces/envModes';
import { Request, Response } from 'express';
import  https  from 'https';



class ApiCall {

    cfgJson: envDetails;
    reqApi: string;

    constructor(){
        this.cfgJson = cfgLoader.load();
    }
    
    //Generates the files corresponding with the requested api
    public async getData(req: Request, res: Response){
        let name = req.params.name
        let result:any = false;

        if(name){

            switch(name){

                case 'api1':
                    result = await this.makeRequest(this.cfgJson.API_MOCS.api1.url, name);
                    res.status(200);
                    res.json("Files from api1 generated successfully");
                break;

                case 'api2':
                    result = await this.makeRequest(this.cfgJson.API_MOCS.api2.url, name);
                    res.status(200);
                    res.json("Files from api2 generated successfully");
                break;

                default:
                    res.status(400);
                    res.json("api name isn't specified in the selected cfg file");
                break;
            }

        }else {
            res.status(404);
            res.json('No api name was given')
        }   
    }

    //Request wrapper
    public async makeRequest(url: string, filesNames: string){
        return new Promise(function(resolve, rejected){
            https.get(url, (resp) => {
                let data = '';
    
                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });
    
                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    let json = JSON.parse(data).items;
                    generateFile.generateCSV(json, 999, '../outputs', filesNames);
                    resolve(true);
                });
            }).on("error", (err) => {
            console.log("Error: " + err);
            rejected(err);
            });
        });  
    }
}

export const apiCall = new ApiCall();
