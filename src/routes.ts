import { Router } from 'express';
import { indexController } from './components/index.controller';
import { getApiController } from './components/getApi/getApi.controller';

class RegisterRoutes {

    public router: Router = Router();

    constructor() {
         this.config();
    }
    config(): void {
        //this.router.get('/', indexController.index);
		this.router.get('/', getApiController.index);
    }
}

const registerRoutes = new RegisterRoutes();
export default registerRoutes.router;