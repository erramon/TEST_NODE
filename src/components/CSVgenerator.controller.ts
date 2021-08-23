import { createObjectCsvWriter } from 'csv-writer';
import * as fs from 'fs';
import * as path from 'path';

class CreateCSVFile {

  //max lines per file
  maxLines:number = 999;
  // path for otuputs
  outputDir:string = 'src/outputs';
  /**
     * Writes the csv files needed according to the limit lines
     * @param fileName: string name of the file
     * @param data: [] array of data for the csv
     */
  async writeCSV(fileName: string, data: any[]) {
    // first we check if output exits and if it does not we create it
    if (!fs.existsSync(this.outputDir)){
      fs.mkdirSync(this.outputDir);
    // if it exists we clear the folder
    } else {
      await this.clearDirectory(this.outputDir)
    }
    const chunkArr = this.chunkArr(data, this.maxLines);
    for (let i = 0; i < chunkArr.length; i++) {
      const csvWriter = createObjectCsvWriter({
          path: `src/outputs/${fileName}_${i}.csv`,
          header: [
            { id: 'index', title: 'Index' },
            { id: 'index_start_at', title: 'Index start at' },
            { id: 'integer', title: 'Integer' },
            { id: 'float', title: 'Flot' },
            { id: 'name', title: 'Name' },
            { id: 'surname', title: 'Surname' },
            { id: 'fullname', title: 'Full name' },
            { id: 'email', title: 'Email' },
            { id: 'bool', title: 'Boolean' },
            ]
          });
        await csvWriter.writeRecords(chunkArr[i]);
    }
  }

  private clearDirectory(directory: string){
    fs.readdir(directory, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
        });
      }
    });
  }

  private chunkArr(arr: any[], size: number) {
    const myArray = [];
    for(let i = 0; i < arr.length; i += size) {
      myArray.push(arr.slice(i, i+size));
    }
    return myArray;
  }

}

export const createCSVFile = new CreateCSVFile();
