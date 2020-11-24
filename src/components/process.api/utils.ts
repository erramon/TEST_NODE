import {
  writeFileSync,
  existsSync,
  mkdirSync,
  unlinkSync,
  readdirSync,
} from "fs";
import { join } from "path";
import { IItem } from "../../utils/models/external.api.model";
import { parseAsync } from "json2csv";

const OUTPUT_FOLDER = "outputs";

export abstract class CSVUtils {
  public static async saveDataCSV(
    folderName: string,
    fileName: string,
    items: IItem[]
  ): Promise<boolean> {
    const csvItems = await parseAsync(items);
    const path = CSVUtils.getPathCSV(folderName);
    writeFileSync(`${path}/${fileName}.csv`, csvItems);
    return true;
  }

  public static getPathCSV(folderName: string) {
    const pathOutput = join(__dirname, `../../${OUTPUT_FOLDER}`, folderName);
    //console.log('crear en'+pathOutput);
    if (!existsSync(pathOutput)) {
      CSVUtils.createFolder(pathOutput);
    }
    return pathOutput;
  }

  public static clearFolder(folderName: string) {
    const pathOutput = join(__dirname, `../../${OUTPUT_FOLDER}`, folderName);
    if (existsSync(pathOutput)) {
      readdirSync(pathOutput).forEach((file) => {
        unlinkSync(`${pathOutput}/${file}`);
      });
    } else {
      CSVUtils.createFolder(folderName);
    }
  }

  public static createFolder(folderName: string) {
    const pathOutput = join(__dirname, `../../${OUTPUT_FOLDER}`, folderName);
    if (!existsSync(pathOutput)) {
      mkdirSync(pathOutput);
    }
  }

  public static createRootFolder(){
    const rootFolder = join(__dirname, `../../${OUTPUT_FOLDER}`);
    if(!existsSync(rootFolder)){
      mkdirSync(rootFolder);
    }
  }
}
