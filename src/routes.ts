import { Router } from 'express';
import { apiUno } from './components/APIUnoController'
import { apiDos } from './components/APIDosController'

class RegisterRoutes {

    public router: Router = Router();

    constructor() {
         this.config();
    }
    config(): void {
        this.router.get('/api-uno', apiUno.index)
        this.router.get('/api-dos', apiDos.index)
    }
}

const registerRoutes = new RegisterRoutes();
export default registerRoutes.router;   