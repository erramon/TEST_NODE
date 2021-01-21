import { Router } from 'express';
import apiController from './components/apiComponent/api.controller';

class RegisterRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }
    
    config(): void {
        this.router.get('/', apiController.start);
    }
}

const registerRoutes = new RegisterRoutes();
export default registerRoutes.router;   