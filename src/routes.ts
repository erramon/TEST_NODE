import { Router } from 'express';
import { indexController } from './components/index.controller';
import { apiController } from './components/api.controller';
import { envApiController } from './components/envApi.controller';

class RegisterRoutes {

    public router: Router = Router();

    constructor() {
         this.config();
    }
    config(): void {
        this.router.get('/', indexController.index);
        this.router.get('/api/:apiVal', apiController.index); // creación de csv a partir de json
        this.router.get('/config/:apiVal', envApiController.index); // lectura de api según entorno
    }
}

const registerRoutes = new RegisterRoutes();
export default registerRoutes.router;   