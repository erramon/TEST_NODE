
import { Request, Response } from 'express';

import { createDir } from '../utils/dir.utils';

const utils = require('../utils/const.utils');

const converter = require("json-2-csv");
const fs = require("fs");
const axios = require('axios');

class IndexController {
  public async index(req: Request, res: Response) {

    const api =req.query.api; //?api={api} - (api1)
	const url = utils.conf.API_MOCS[`${api}`].url; //API_MOCS url
    const nameFile = `${utils.env}.${api}`; //name file --> (dev.api1)

	let json = await axios.get(url);
	
	let dir = new createDir().checkExistsOrCreate('src/output');
	
	let json2csvCallback = function (err:any, csv:any) {
		if (err) throw err;
		const headers = csv.split('\n').slice(0,1);
		const records = csv.split('\n').slice(0,);

		for(let i=1; i<records.length; i=i+utils.maxRecords) {
		  let dataOut = headers.concat(records.slice(i, i+utils.maxRecords)).join('\n');
		  let id = Math.floor(i/utils.maxRecords)+1;
		  fs.writeFileSync(`${dir}/${nameFile}.${id}.csv`, dataOut);
		}

	  };

	  converter.json2csv(json.data.items, json2csvCallback);	  
	  
	  
  }
}

export const indexController = new IndexController(); 
