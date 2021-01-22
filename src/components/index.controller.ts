
import { Request, Response } from 'express';
import { environment } from '../utils/environment.utils';
import { csvRequest } from '../providers/cvs.provider';
import {deleteArchieves, convertJsonToCsV} from '../services/csvConvert.service'
import {MocksApiResponse} from '../models/mocksApiResponse'
const path = require('path');
const jsoncsv = require('json-2-csv');
const fs = require('fs');
const mock = require('../../mocksdata/mocksapi2backup.json');

class IndexController {
  public async index(req: Request, res: Response) {
    try {
      const api = req.query.api;
      const apiUrl = environment().API_MOCS[`${api}`].url;
      //const result = mock;
      const result: MocksApiResponse = await csvRequest(apiUrl);
      await deleteArchieves(api)
      await convertJsonToCsV(result.items, api);
      res.json('Se han importado correctamente los archivos');
    }
    catch {
      res.status(500).json('Se ha producido un error')
    }
    
  }
}

export const indexController = new IndexController(); 
