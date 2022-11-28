import * as fs from 'fs';

/**
 * Utility methods
 */
class Utils {
	constructor() {
         this.configEnv();
    }

    configEnv() {
        var result = {statusCode: 0, data: ""};

        try {
			result.statusCode = 200;
			result.data = fs.readFileSync('./src/config/' + process.env.NODE_ENV + '.json', 'utf8');
        } catch (err) {
			result.statusCode = 500;
			result.data = "Error configEnv";
        }

        return result;
    }
}

const utils = new Utils();
export default utils.configEnv;  