import { ExternalDataApiUtils } from "../../utils/external.api";
import { CSVUtils } from "./utils";

export class ProcessApiService {
  private ROWS_PER_FILE = 999;

  async processData(url: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      // get data api
      const data = await ExternalDataApiUtils.getDataApi(url);

      const now = new Date();
      const folderName = `${now.getFullYear()}${now.getMonth() + 1}`;

      //clear folder
      await this.clearFolder(folderName);

      // DIVIDO EL ARRAY EN 998 REGISTROS + (1 el cabezal) da 999
      const cntFiles = Math.ceil(data.items.length / (this.ROWS_PER_FILE - 1));

      const saveLote = [];
      for (let i = 0; i < cntFiles; i++) {
        const start = i * (this.ROWS_PER_FILE - 1);
        const end = start + (this.ROWS_PER_FILE - 1);
        saveLote.push(
          CSVUtils.saveDataCSV(folderName, "" + i, data.items.slice(start, end))
        );
      }
      Promise.all(saveLote)
        .then((data) => {
          const saveIsOk = data.every((result) => result === true);
          if (saveIsOk) {
            resolve(saveIsOk);
          } else {
            reject(false);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  private async clearFolder(folderName: string) {
    CSVUtils.clearFolder(folderName);
  }
}
