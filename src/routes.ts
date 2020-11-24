import { Router } from 'express';
import { processApiController } from './components/process.api/process.api.controller';

class RegisterRoutes {

    public router: Router = Router();

    constructor() {
         this.config();
    }
    config(): void {
        this.router.get('/', processApiController.index);
    }
}

const registerRoutes = new RegisterRoutes();
export default registerRoutes.router;   