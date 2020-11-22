import { Data } from "./entities/data.model";
import { createFolder } from "./utils/createFolder.util";
import { folderExists } from "./utils/folderExists.util";
import { removeOldFiles } from "./utils/removeOldFiles.util";
import https from 'https';
import { writeCsv } from "./utils/writeCsv.util";
import { ExportReport } from "./entities/export-report.model";
import { getEndpoint } from "../../utils/getEndpoint.util";

class DataExportService {
    public async export (api: string):  Promise<ExportReport> {
        if (folderExists(api)) {
            // Remove old files if folder exists
            removeOldFiles(api);
        } else {
            // Create api folder if not exists
            createFolder(api);
        }

        // Get remote data
        const data: Data = await this.getData(api);

        // Write files
        return await writeCsv(data, api);
    }

    private async getData(api: string): Promise<Data> {
        const endpoint = getEndpoint(api);
        
        return new Promise(function(resolve, reject){
            https.get(endpoint, (response) => {
                let data = '';
    
                response.on('data', (chunk) => {
                    data += chunk;
                });
    
                response.on('end', () => {
                    let json = JSON.parse(data) as Data;

                    resolve(json);
                });
            }).on("error", (error) => {
                reject(error);
            });
        });  
    }
}
export const dataExportService = new DataExportService();
