import { Router } from 'express';
import { indexController } from './components/index.controller';
import { comprobarQuery } from './middlewares/comprobarquery'

class RegisterRoutes {

    public router: Router = Router();

    constructor() {
         this.config();
    }
    config(): void {
        this.router.get('/',[
            comprobarQuery
        ], indexController.index);
    }
}

const registerRoutes = new RegisterRoutes();
export default registerRoutes.router;   