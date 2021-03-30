import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import moment from 'moment';

class CsvUtils {
  constructor() {}

  /**
   * Creates the required csv files by row limit
   * @param dir directory where to create the files
   * @param name file name
   * @param data the data to be converted into csv
   * @param limit the limit of rows each csv file will have. By default 998 (count +1 of the header)
   * @returns a promise with a string indicating the result
   */
  public async createCsvFiles(dir: string, name: string, data: any[], limit = 998): Promise<string> {
    try {
      let resultMessage: string;
      if (data.length > 0) {
        const date: moment.Moment = moment();
        const subDir: string = date.format('DD-MM-YYYY');
        this.checkDir(dir, subDir);
        const numberOfFiles = Math.ceil(data.length / limit);
        for (let index = 0; index < numberOfFiles; index++) {
          const start: number = index * limit;
          const end: number = limit * (index + 1);
          const fileName: string = `${dir}/${subDir}/${name}-${subDir} (${index + 1}).csv`;
          const csv: string = this.objectsToCsv(data, start, end);
          await fsPromises
            .writeFile(fileName, csv, 'utf-8')
            .then(_ => console.log(`${fileName} created`))
            .catch(error => console.error(error));
        }
        resultMessage = `${numberOfFiles} csv files generated in the path ${dir}/${subDir}`;
      } else {
        resultMessage = 'No data';
      }
      console.log(resultMessage);
      return resultMessage;
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }

  /**
   * Checks if the directory exists, if not, it is created
   * @param dir the directory to check
   */
  private checkDir(dir: string, subDir = '') {
    try {
      if (fs.existsSync(dir)) {
        fs.rmdirSync(dir, { recursive: true });
      }
      fs.mkdirSync(dir);
      fs.mkdirSync(`${dir}/${subDir}`);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }

  /**
   * Convert an array of objects to a string in csv format
   * @param data the data to be converted
   * @param start index where extraction begins
   * @param end index where extraction ends
   * @returns a string in csv format
   */
  private objectsToCsv(data: any[], start: number, end: number): string {
    const columns: string[] = Object.keys(data[0]);
    const csvData: any = data.slice(start, end).map((row: any) => Object.values(row));
    csvData.unshift(columns);
    return `"${csvData.join('"\n"').replace(/,/g, '","')}"`;
  }
}

const csvUtils = new CsvUtils();
export default csvUtils;
