import { Request, Response } from "express";
import { ConfigUtils, IConfigApi } from "../utils/index.utils";
import { processApiController } from "./process.api/process.api.controller";
class IndexController {
  public async index(req: Request, res: Response) {
    res.json("Holamundo");
  }
}

export const indexController = new IndexController();
