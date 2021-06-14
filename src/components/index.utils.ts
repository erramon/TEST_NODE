import { DirUtils } from '../utils/dir.utils';
import { constUtils } from '../utils/const.utils';
import { csvConverter } from '../utils/convert.utils';
import { IUtilsComp } from './model.comtroller';

const axios = require('axios');

class UtilsController {
	
	private dirUtils = new DirUtils();
	private constUt = new constUtils();
	private csvConverter = new csvConverter();

	public async utilsCsvConverter (api: any): Promise<IUtilsComp> {

		let iUtils: IUtilsComp;	// initialize model	

		try {
			iUtils = {
				dir: `src/output/${api}`,
				dirExists: false
			}
			iUtils.dirExists = await this.dirUtils.existsDir(iUtils.dir); // initialize existsDir() with the dir variable
			if (iUtils.dirExists != true) {
				await this.dirUtils.createDir(iUtils.dir); // create directory if it doesn't exist
			}else {
				// if the directory exists delete it and recreate it
				await this.dirUtils.delDir(iUtils.dir), this.dirUtils.createDir(iUtils.dir);
			}			
		} catch (error) {
			console.log(`dir utilsCsvConverter: ${error}`);
		}

		try {
			iUtils.url = this.constUt.conf.API_MOCS[`${api}`].url; // https://mocks.free.beeceptor.com/api2
			iUtils.nameFile = `${this.constUt.env}.${api}`; // define the file name -> dev.apiX
			iUtils.json = await axios.get(iUtils.url); // create the connection with the url
			await this.csvConverter.converterData(iUtils.json.data.items, iUtils.nameFile, iUtils.dir);
		} catch (error) {
			console.log(`convert utilsCsvConverter: ${error}`);
		}

		return Promise.resolve(iUtils);

	}
}

export const utilsController = new UtilsController();
