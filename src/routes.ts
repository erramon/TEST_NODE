import { Router } from 'express';
import { mainController } from './components/main.controller';

class RegisterRoutes {

    public router: Router = Router();

    constructor() {
         this.config();
    }
    config(): void {
        this.router.get('/', mainController.index);
    }
}

const registerRoutes = new RegisterRoutes();
export default registerRoutes.router;   