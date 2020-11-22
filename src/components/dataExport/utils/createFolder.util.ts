import fs from 'fs';
import path from "path";

export function createFolder(folder: string) {
    fs.mkdirSync(path.join('src/outputs/', folder));
}