import { envUtils } from '@utils/env.utils';
import axios, { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { DataResponse } from './csv.models';
import csvUtils from './csv.utils';

class CsvController {
  constructor() {}

  /**
   * Download the data from the api and download it in csv format
   */
  public async download(req: Request, res: Response) {
    if (req.query && req.query.api) {
      const api: string = envUtils.getApiUrl(req.query.api.toString());
      const response: AxiosResponse<any> = await axios.get(api);
      const data: DataResponse = response.data;

      const filesResult = await csvUtils.createCsvFiles('src/outputs', 'Data_File', data.items);

      res.status(200).json(filesResult);
    } else {
      res.status(400).end();
    }
  }
}

const csvController = new CsvController();
export default csvController;
