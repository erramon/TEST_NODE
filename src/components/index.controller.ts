import { Request, Response } from 'express';
import { utilsController } from './index.utils';
import { IControllerComp } from './model.comtroller';

class IndexController {

	public async index(req: Request, res: Response): Promise<IControllerComp> {

		let iController: IControllerComp;

		try {			
			iController = {
				api: req.query.api // api2
			};
			// initialize utilsCsvConverter and pass it the api and url variables
			await utilsController.utilsCsvConverter(iController.api);
			res.status(200).send('Finished process');			
		} catch (error) {
			console.log(`indexController: ${error}`);
		}

		return Promise.resolve(iController);
	}
}

export const indexController = new IndexController();
