import { Router } from 'express';
import { indexController } from './components/index.controller';
import  { apiCall }  from './components/api-call.controller';

class RegisterRoutes {

    public router: Router = Router();

    constructor() {
         this.config();
    }
    config(): void {
        //Adding .bind method and the controller itself as a parameter to avoid 
        //undefined context to "this" variable. 
        this.router.get('/', indexController.index.bind(indexController));
        this.router.get('/api=:name', apiCall.getData.bind(apiCall));
    }
}

const registerRoutes = new RegisterRoutes();
export default registerRoutes.router;   