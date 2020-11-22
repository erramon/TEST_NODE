import fs from 'fs';

export function folderExists(folder: string): boolean {
    return fs.existsSync('src/outputs/' + folder);
}