import * as fs from "fs";
import * as path from "path";
import { createObjectCsvWriter as createCSVWriter } from "csv-writer";

const BACKUP_DIR = "./build/outputs"; // The Place where the CSV files are located.
const MAX_LINES_PER_CSV = 998; // Maximum of 998 lines of registers + 1 line of indexes.

/**
 * Receive an object with an array of subObjects, and backup that subObjects in CSV files located in BACKUP_DIR, with a maximum of MAX_LINES_PER_CSV (Check libnes 5 and 6)
 * If there are more than MAX_LINES_PER_CSV registers, the rest are located in another file with the same file limit of 999 (index + MAX_LINES_PER_CSV lines of registers).
 * @param data Object containing the array of data.
 */
export function bulkDataInCSV(data: any) {
  return new Promise<void>((resolve, reject) => {
    if (data && data.items && data.items.length) {
      console.log("Number of lines: " + data.items.length);
      clearBackupDir()
        .then(() => {
          console.log("Creating new files");

          divideInNFiles(data.items)
            .then(() => resolve())
            .catch(() => reject());
        })
        .catch(() => {
          console.log("Failed in the old backup files cleaning");
          reject();
        });
    } else {
      console.log("The endpoint returned wrong data");
      reject();
    }
  });
}
/**
 * Slice the data in n parts to fit the MAX_LINES_PER_CSV rule, and write in the files.
 * @param data data to slice and locate in CSV
 */
function divideInNFiles(data: any) {
  return new Promise<void>((resolve, reject) => {
    try {
      const datetime = new Date();

      const parts = Math.ceil(data.length / MAX_LINES_PER_CSV);
      console.log("Splitting data in " + parts);

      let partitionedData = [];

      for (let i = 0; i < parts; i++) {
        partitionedData.push(
          data.slice(
            i * MAX_LINES_PER_CSV,
            i * MAX_LINES_PER_CSV + MAX_LINES_PER_CSV
          )
        );

        const fileName = `Backup-${i + 1}-From-Date-${datetime}.csv`;
        const csvWriter = createCSVWriter({
          path: path.join(BACKUP_DIR, fileName),
          header: getHeadersForCSV(data[0]),
        });

        const csvData = partitionedData[i];

        csvWriter
          .writeRecords(csvData)
          .then(() => console.log("File Written: " + fileName));
      }

      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
/**
 * Return the indexes for the CSV files checking the indexes of the objects in the array.
 * @param data one object to check it's indexes.
 */
function getHeadersForCSV(data: any): any[] {
  let indexes: any[] = [];
  Object.keys(data).forEach((key) =>
    indexes.push({ id: key, title: key.charAt(0).toUpperCase() + key.slice(1) })
  );

  return indexes;
}

/**
 * Clearing of the BACKUP_DIR, where the old backup files are located.
 * Also create the BACKUP_DIR if not found.
 */
function clearBackupDir() {
  return new Promise<void>((resolve, reject) => {
    try {
      fs.readdir(BACKUP_DIR, (err, files) => {
        if (err && err.code === "ENOENT") {
          console.log("Directory Output not found. Creating...");
          fs.mkdirSync(BACKUP_DIR);
          resolve();
        } else {
          console.log("Files to delete: " + files);
          for (const file of files) {
            fs.unlink(path.join(BACKUP_DIR, file), (err) => {
              if (err) reject(err);
            });
          }
          resolve();
        }
      });
    } catch (error) {
      reject();
    }
  });
}
