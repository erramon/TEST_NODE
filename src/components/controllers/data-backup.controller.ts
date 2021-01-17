import { Response } from "express";
import { getRequest } from "../utils/http-request-handler";
import { bulkDataInCSV } from "./data-backup.util";

class DataBackupController {
  public async index(req: any, res: Response) {
    console.log("Requesting to endpoint: " + req.validatedApi.url);
    const dataToBackup = await getRequest(req.validatedApi.url);
    //const dataToBackup = require("../../../mocksdata/mocksapi1backup.json"); // For test purposes only. If you want to use the local files, comment the line 8 and unncoment this one.
    bulkDataInCSV(dataToBackup)
      .then(() => res.json("Datos volcados con éxito."))
      .catch(() => res.json("Error en el volcado de datos."));
  }
}

export const dataBackupController = new DataBackupController();
