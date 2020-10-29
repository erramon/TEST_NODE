/*
    This file is responsible to load the config file from "config" folder. The config is specified in the .env file. 
*/
import path from 'path';

class loadCfg {
    load(){
        if(process.env.NODE_ENV == undefined){
            console.log("Missing NODE_ENV variable");
        }else {
            let pathLocation = "../config/";
            const __dirname = path.resolve();
            pathLocation = pathLocation.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, '');
            let envJson = require(path.resolve(__dirname, pathLocation)+'/'+process.env.NODE_ENV+".json");
            return envJson;
        }        
    }
}

export const cfgLoader =  new loadCfg();;