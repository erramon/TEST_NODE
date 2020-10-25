
import { Request, Response } from 'express';
import {requestLoaderService} from '../utils/requestLoader.service';
import {jsonLoaderService} from '../utils/jsonLoader.service';


class EnvApiController {

    
    public async index(req: Request, res: Response) {
      let env = process.env.NODE_ENV; // obtengo valor de entorno
      let apiValue = req.params["apiVal"]; //obtengo valor de parametro recogido en ':apiVal' de la url
      let valido:boolean = apiValue === 'api1' || apiValue === 'api2'; // evaluo se apiVal es uno de los dos parámetros admitidos
      const currentEnvUrl = "src/config/"+env+".json"; // conformo la ruta del json del que leeré la url para hacer la llamada, según entorno
      if(valido){ // ... si los valores son los permitidos procederé
        let dataJsonFile = await jsonLoaderService.loadFile(currentEnvUrl); // recojo objeto mediante utilidad json para leer el archivo que toque según entorno
        let url=dataJsonFile.API_MOCS[apiValue].url; // recojo url para hacer la request
        let dataRequest = await requestLoaderService.loadRequest(url); // recojo valores mediante utilidad request a partir del valor url
        let requestParse = JSON.parse(dataRequest); // parseo a json los valores recogidos
        res.json(requestParse);  // saco los valores en pantalla
      }else{ // ... si los valores no son permitidos lanzo alerta
        res.json("PARÁMETRO NO VÁLIDO: USE 'config/api1' o 'config/api2'");  
      }
      

  }
}

export const envApiController = new EnvApiController(); 
