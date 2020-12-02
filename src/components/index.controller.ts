
import { Request, Response } from 'express';
import { config } from '../utils/globalConfig';
import { get } from '../utils/http'
import {bufToCsv} from '../utils/csv'
class IndexController {
  public async index(req: Request, res: Response) {
    const index: any = req.query.api;
    if(typeof config.API_MOCS[index] === 'undefined'){
      res.status(404).json('nok')
    }
    let responsePetition = await get(config.API_MOCS[index].host, config.API_MOCS[index].path)
    bufToCsv(responsePetition)
    res.json('ok');
  }
}

export const indexController = new IndexController(); 
