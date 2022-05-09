import { Router } from 'express';
import { indexController } from './components/index.controller';
import { usersBackUpController } from './components/users-backUp/usersBackUp.controller';

class RegisterRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/', usersBackUpController.createBackupByApi);
    }
}

const registerRoutes = new RegisterRoutes();
export default registerRoutes.router;
