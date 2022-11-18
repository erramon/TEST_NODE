import { Router } from 'express';
import { indexController } from './components/index.controller';
import { reportController } from './components/reports/report.controller';

class RegisterRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/', indexController.index);
        this.router.get('/generate-report', reportController.generateReport);
    }
}

const registerRoutes = new RegisterRoutes();
export default registerRoutes.router;  