import { Request, Response } from 'express';

var https = require('https');
import Utils from './../../utils/Utils';

import * as fs from 'fs';

class GetApiController {
  public async index(req: Request, res: Response) {
	const numberApi: string = req.query.api.toString();
	const utilsConfigEnv = Utils();

	if (utilsConfigEnv.statusCode == 200) {
		/* GET URL FROM CONFIG */
		const data = JSON.parse(utilsConfigEnv.data);
		const numberApi = req.query.api.toString();
		const urlApi = data.API_MOCS[numberApi].url;

		var requestApi = https.get(urlApi, function(responseApi: Response) {
			var responseApiBody = '';

			responseApi.on('data', function (chunk) {
				responseApiBody += chunk;
			});
			
			responseApi.on('end', function() {
				/* WORK DIRECTORY */
				const fileDir = './src/outputs/' + numberApi + '/';
				
				/* EMPTY DIR */
				fs.readdirSync(fileDir).forEach(f => fs.rmSync(`${fileDir}/${f}`));

				/* GET RECORDS FROM URL */
				//var responseApiBodyJson = JSON.parse(responseApiBody).items;
				
				/* GET RECORDS FROM FILE MOCK */
				let file = fs.readFileSync('./mocksdata/mocksapi1backup.json', 'utf8');
				var responseApiBodyJson = JSON.parse(file).items;
				
				/* MAX ROWS */
				const chunkSize = 999;
				
				/* ROWS FOR OBJECT */
				const objectSize = Object.keys(responseApiBodyJson[0]).length + 2;
				
				/* MAX OBJECTS */
				const maxNumObjects = (chunkSize/objectSize) | 0;

				var count = 1;

				for (let i = 0; i < responseApiBodyJson.length; i += maxNumObjects) {
					/* SEPARATE ARRAY */
					const chunk = responseApiBodyJson.slice(i, i + maxNumObjects);

					/* WRITE ARRAY IN FILE */
					fs.writeFile(fileDir + count + '.csv', JSON.stringify(chunk, null, 2), { flag: 'a+' }, function (err) {
						if (err) {
							res.status(500).send({ message: "Error" });
						}
					});

					count++;
				}

				res.status(responseApi.statusCode).send({ message: "Success!" });
			});
		});

		requestApi.on('error', function(e: Error) {
		  res.status(500).send({ message: e.message });
		});
	}
	else {
		res.status(utilsConfigEnv.statusCode).send({ message: "Error" });
	}
  }
}

export const getApiController = new GetApiController(); 
