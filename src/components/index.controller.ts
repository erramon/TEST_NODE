
import { Request, Response } from 'express';
import { cfgLoader } from './../utils/loadCfg';
import { envDetails } from './../interfaces/envModes';

class IndexController {

  info: envDetails

  constructor() {
    this.info = cfgLoader.load();
  }

  public async index(req: Request, res: Response) {
    
    let data = {
      Enviroment: process.env.NODE_ENV,
      api1: this.info.API_MOCS.api1.url,
      api2: this.info.API_MOCS.api2.url
    }
      res.json(data);      
  }
}

export const indexController = new IndexController(); 
