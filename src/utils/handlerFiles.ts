import * as fs from 'fs';

class HandlerFiles {

    static cleanDirectory(pathDirectory: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                fs.rmdirSync(pathDirectory, { recursive: true });
                fs.mkdirSync(pathDirectory);
                resolve(true)
            } catch (err) {
                reject(err);
            }
        });
    }

    static readFile(path: string): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    static writeFile(path: string, data: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, data, 'utf8', (err) => {
                if (err) reject(err);
                else resolve(true);
            });
        })
    }
}

export default HandlerFiles;