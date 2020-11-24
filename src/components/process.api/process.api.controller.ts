import { Request, Response } from "express";
import { ProcessApiService } from "./process.api.service";
import { ConfigUtils } from "../../utils/config";

import { IConfigApi, IApiConf } from "../../utils/index.utils";

const processApiService = new ProcessApiService();

class ProcessApiController {
 
  public async index(req: Request, res: Response) {
    const { api } = req.query;
    if (api !== undefined && api !== "") {
      
      const urlConfigApi: IConfigApi = await ConfigUtils.getApiURL();
      const urlApiData: IApiConf = urlConfigApi.API_MOCS[api.toString()];
      //consulto servicio
      try{
        await processApiService.processData(urlApiData.url);
        res.json({
          ok: true
        });
      
      }catch(err){        
        console.log(err)
        res.status(400).json({
          ok: false,
          msg: "Ocurrio un error al ejecutar la solicitud",
        });  
      
      }
    } else {
      res.status(400).json({
        ok: false,
        msg: "Parametros Incorrectos",
      });
    }
  }
}

export const processApiController = new ProcessApiController();
