
import { Request, Response } from 'express';
import { jsonLoaderService } from '../utils/jsonLoader.service';

class ApiController {


  public async index(req: Request, res: Response) {
    var converter = require("json-2-csv"); //importamos modulo para converir json en csv
    var fs = require("fs"); //importamos modulo file system de node
    const baseUrl = './src/outputs'; // url de base para evaluar existencia de directorio
    let dataJsonFile; // declaro variable donde recojo objeto json
    let apiVal = req.params["apiVal"]; // recojo parametro admitido de la url
    let valido:boolean = true;
    switch (apiVal) {
      case "api1":
        dataJsonFile = await jsonLoaderService.loadFile("mocksdata/mocksapi1backup.json");
        break;
      case "api2":
        dataJsonFile = await jsonLoaderService.loadFile("mocksdata/mocksapi2backup.json");
        break;
        default: // si el parametro no es 'api1' o 'api2' lanzo alerta y valido es false. 
          res.json("PARÁMETRO NO VÁLIDO: USE 'api/api1' o 'api/api2'");  
          valido = false;
    }
    if(valido){ // si los valores de parametros son los admitidos
      // evalúo si ya existe directorio 'outputs' en 'src'
      if (fs.existsSync(baseUrl)) {
        fs.readdirSync(baseUrl).forEach((file: any, index: any) => {
            fs.unlinkSync(baseUrl+'/'+file); //elimino los archivos de output
          }
        );
      }
  
      var json2csvCallback = function (err: any, csv: any) { //fallback para escribir a archivo el csv recién generado
        if (err) throw err;
  
        fs.writeFile("./src/outputs/" + apiVal + ".csv", csv, function (err: any) {
          if (err) throw err;
        });
      };
      
      converter.json2csv(dataJsonFile, json2csvCallback); // método de conversión son a csv
      res.json(apiVal + " has been saved.");
    }
  }



}

export const apiController = new ApiController(); 
