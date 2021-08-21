import { Request, Response } from 'express';
import axios from 'axios';
import { createCSVFile } from './CSVgenerator.controller';
import { getJSONConfig } from '../utils/utils';
// mock for tests
//import mockData from '../../mocksdata/mocksapi1backup.json';

class IndexController {

 public async index(req: Request, res: Response) {
   // first we find the url with re.query paramter
   const config = getJSONConfig();
   let url;
   for (let key in config.API_MOCS) {
     if (key === req.query.api.toString()) {
       url = config.API_MOCS[key].url;
     }
   }
   try {
     const data = await axios.get(url);
     // proccess using the mock for tests
     //await createCSVFile.writeCSV(req.query.api.toString(), mockData.items);
     // proccess using the url
     await createCSVFile.writeCSV(req.query.api.toString(), data.data.items);
     res.status(200).send({ message: 'Los datos se procesaron correctamente' });
   } catch (err) {
     res.status(400).send(err);
   }

  }
}

export const indexController = new IndexController();
