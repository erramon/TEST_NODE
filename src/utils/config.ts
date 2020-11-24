import { readFileSync } from "fs";
import { join } from "path";
import { IConfigApi } from "./models/config.model";

export abstract class ConfigUtils {


  public static async getApiURL(): Promise<IConfigApi> {
    
    const path = join(__dirname, "../config", `${process.env.NODE_ENV}.json`);
    const configFile = readFileSync(path, 'utf8');
    const config: IConfigApi = JSON.parse(configFile);
    return config;

  }


}
