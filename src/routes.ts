import csvController from '@components/csv/csv.controller';
import { indexController } from '@components/index.controller';
import { Router } from 'express';

class RegisterRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get('/index', indexController.index);

    this.router.get('/', csvController.download);
  }
}

const registerRoutes = new RegisterRoutes();
export default registerRoutes.router;
