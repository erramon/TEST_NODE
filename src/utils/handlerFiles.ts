import * as fs from 'fs';

class HandlerFilesUtil {

    /**
     *
     * @param pathDirectory
     * @returns {Promise<boolean | boolean[]>} A promise that contains if the directory was cleaned
     */
    cleanDirectory(pathDirectory: string): Promise<boolean | boolean[]> {
        return new Promise(async (resolve, reject) => {
            try {
                if (fs.existsSync(pathDirectory)) {
                    const files = await this.readDirectory(pathDirectory);
                    const filesDeleted: Promise<boolean>[] = [];

                    if (files.length) {
                        files.forEach(async (file) => {
                            filesDeleted.push(this.deleteFile(pathDirectory + '/' + file));
                        });
                        resolve(Promise.all(filesDeleted));
                    } else {
                        resolve(true);
                    }

                } else {
                    fs.mkdirSync(pathDirectory, { recursive: true });
                    resolve(true);
                }

            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     *
     * @param pathDirectory
     * @returns {Promise<string[]>} A promise that contains the files of directory
     */
    readDirectory(pathDirectory: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            fs.readdir(pathDirectory, (err, files) => {
                if (err) reject(err);
                resolve(files);
            });
        });
    }

    /**
     *
     * @param pathFile
     * @returns {Promise<boolean>} A promise that contains if the file was delete
     */
    deleteFile(pathFile: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fs.unlink(pathFile, (err => {
                if (err) reject(err);
                else resolve(true);
            }));
        });
    }

    /**
     *
     * @param pathFile
     * @returns {Promise<string>} A promise that contains the file data
     */
    readFile(pathFile: string): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.readFile(pathFile, 'utf8', (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    /**
     *
     * @param pathFile
     * @param data
     * @returns {Promise<boolean>} A promise that contains if the file was created
     */
    writeFile(pathFile: string, data: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fs.writeFile(pathFile, data, 'utf8', (err) => {
                if (err) reject(err);
                else resolve(true);
            });
        })
    }
}

export const handlerFilesUtil = new HandlerFilesUtil();
