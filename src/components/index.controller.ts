
import { Request, Response } from 'express';
import { createDir } from '../utils/dir.utils';
import { constUtils } from '../utils/const.utils';
import { jsonUtils } from '../utils/const.utils';

const converter = require("json-2-csv");
const fs = require("fs");
const axios = require('axios');

class IndexController {
  public async index(req: Request, res: Response) {	

	const api = req.query.api;
	//console.log(`api: ${api}`); // ?api={api} - (api1)

	// crear directorios => dir.utils.ts pasando nombre dir y api -- return dire (src/output/api(n))
	let dir = new createDir().checkExistsOrCreate(`src/output/`, api);
	//console.log(`dir: ${dir}`); // src/output/api1

    let nameFile = new jsonUtils().fileName(api);	//nombre fichero => dev.api1 --return nameFile
	//console.log(`nameFile: ${nameFile}`);
	
	let json = await axios.get(new jsonUtils().jsonUrl(api));
	//console.log(`json: ${json}`);

	let constUt = new constUtils(); // inicializar constUtils()	
	
	let json2csvCallback = function (err:any, csv:any) {
		if (err) throw err;
		const headers = csv.split('\n').slice(0,1);
		const records = csv.split('\n').slice(0,);

		for(let i=1; i<records.length; i=i+constUt.maxRecords) {
		  let dataOut = headers.concat(records.slice(i, i+constUt.maxRecords)).join('\n');
		  let id = Math.floor(i/constUt.maxRecords)+1;
		  fs.writeFileSync(`${dir}/${nameFile}.${id}.csv`, dataOut);
		}

	  };

	  converter.json2csv(json.data.items, json2csvCallback);
	  

	  res.json('Terminado');
	  
	  
  }
}

export const indexController = new IndexController(); 
