import { Report } from "../models/report.models";
import fs from "fs";
import path from "path";

const { Parser } = require('json2csv');
const _DIR = './outputs';

export default async function createCsv(reports: Report[]) {
    await deleteFolderFiles(path.join(__dirname, `../../outputs/`));
    const fields = Object.keys(reports[0]);
    const opts = { fields };
    let index = 0;

    try {
        const parser = new Parser(opts);
        do {
            const csv = parser.parse(reports.splice(0, 999));
            fs.writeFileSync(path.join(__dirname, `../../outputs/file${index + 1}.csv`), csv);
            index++;
        } while (reports.length > 0);
    } catch (err) {
        console.error(err);
    }
}

/*
* Delete or create folder
*/
async function deleteFolderFiles(path: string) {
    let files = [];
    if (!fs.existsSync(_DIR)) {
        fs.mkdirSync(_DIR);
    } else {
        files = fs.readdirSync(path);
        files.forEach(function (file) {
            let curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                deleteFolderFiles(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
    }
}

