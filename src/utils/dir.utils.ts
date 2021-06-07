const fs = require("fs");
const rimraf = require("rimraf");

export class createDir {
    checkExistsOrCreate(dir: string) {

        if (fs.existsSync(dir)) {
            rimraf.sync(dir);
            fs.mkdirSync(dir);
        }else {
            fs.mkdirSync(dir);
        }

        return dir;

    }
}