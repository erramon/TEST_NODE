import axios from "axios";
import fs from "fs";
import path from "path";
import { Report } from "../models/report.models";

export async function getDataService(type: any): Promise<Report[]> {
    if (type !== 'api1' && type !== 'api2') {
        throw "Invalid parameter: Example request http://localhost:3000/generate-report?api=api1 or http://localhost:3000/generate-report?api=api2";
    }
    const filePath = `${process.env.NODE_ENV}.json`;
    if (filePath) {
        let url: any;
        try {
            url = await getUrl(filePath);
        } catch (error) {
            throw "Error to read file config";
        }
        return axios.get(url[type].url)
            .then(function (response: any) {
                return response.data.items;
            })
            .catch(function (error: any) {
                if (error.response.status === 429) {
                    return getMockData(type);
                } else {
                    throw "Error to execute " + error;
                }
            })
    } else {
        throw "Enviroment not exist";
    }
}

async function getUrl(filePath: string) {
    return await JSON.parse(fs.readFileSync(path.join(__dirname, `../config/${filePath}`), 'utf-8')).API_MOCS;
}


/*
* Called if the api return many request
*/
function getMockData(type: any) {
    const mockData = type == "api1" ?
        JSON.parse(fs.readFileSync(path.join(__dirname, `../../mocksdata/mocksapi1backup.json`), 'utf8')) :
        JSON.parse(fs.readFileSync(path.join(__dirname, `../../mocksdata/mocksapi2backup.json`), 'utf8'));
    return mockData.items;
}