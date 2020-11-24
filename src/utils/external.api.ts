import { readFileSync } from "fs";
import { join } from "path";
import { IResponseDataApi } from "./models/external.api.model";
import axios from "axios";

export abstract class ExternalDataApiUtils {
  public static async getDataApi(url: string): Promise<IResponseDataApi> {
    //return ExternalDataApiUtils.getDataApiMoc(url);
    const response = await axios.get(url);
    const data: IResponseDataApi = response.data;
    return data;
  }

  public static async getDataApiMoc(url: string): Promise<IResponseDataApi> {
    // TEST MOCK
    const path = join(__dirname, "../../mocksdata", `mocksapi1backup.json`);
    const fileAPI = readFileSync(path, "utf8");
    const data: IResponseDataApi = JSON.parse(fileAPI);

    return data;
  }
}
