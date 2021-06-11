import { Request, Response } from 'express';
import { constUtils } from '../utils/const.utils';
import { csvConverter } from '../utils/convert.utils';

const converter = require("json-2-csv");
const axios = require('axios');
const fs = require("fs");

class IndexController {

	public convert: csvConverter;

	constructor() {
		this.convert = new csvConverter();
	}

	public async index(req: Request, res: Response) {		
		
		const api = req.query.api; // ?api={api} - (api?)
		
		const url = (new constUtils().conf).API_MOCS[`${api}`].url; // https://mocks.free.beeceptor.com/api?

		const json = await axios.get(url);

		//let converterUtils = await converter.json2csv(json.data.items);
		let converterUtils = await converter.json2csvAsync(json.data.items);
		//console.log(`converterUtils: ${converterUtils}`);

		await this.convert.jsonToCsv(converterUtils);

		res.json('Terminado');

	}
}

export const indexController = new IndexController();
