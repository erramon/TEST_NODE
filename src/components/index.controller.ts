
import { Request, Response } from 'express';
import { config } from '../utils/config'
import { DatosApi } from '../helpers/leerdatosapi'
import { Archivos } from '../helpers/archivos'
const {api1, api2} = config.API_MOCS
const datosApi = new DatosApi();
const archivos = new Archivos();

class IndexController {
  public async index(req: Request, res: Response) {
    if(req.query.api === 'api1'){
      
      archivos.crearCsv('1');
      const {data} = await datosApi.devolverApi(api1.url);
      return res.send({data});
     
    }else if(req.query.api === 'api2'){

      archivos.crearCsv('2');
      const {data} = await datosApi.devolverApi(api2.url);
      return res.send({data});

    }else{

      return res.json('hola mundo');

    }  
  }
}

export const indexController = new IndexController(); 
