const fs = require("fs");
const rimraf = require("rimraf");

export class DirUtils {
    // check if directory exists
    public existsDir(dir: string) {
        if (fs.existsSync(dir)){
            return true;
        }
    }
    // delete a directory recursively
    public delDir(dir: string) {
        rimraf.sync(`${dir}`);
    }
    // create a directory recursively
    public createDir(dir: string) {
        fs.mkdirSync(`${dir}`, { recursive: true });
    }
}