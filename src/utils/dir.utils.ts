const fs = require("fs");
const rimraf = require("rimraf");

export class createDir {
    checkExistsOrCreate(dir: string, api: any) {
        let dire = `${dir}${api}`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        if (fs.existsSync(dire)) {
            rimraf.sync(dire);
            fs.mkdirSync(dire);
        }else {
            fs.mkdirSync(dire);
        }
        return dire;
    }
}