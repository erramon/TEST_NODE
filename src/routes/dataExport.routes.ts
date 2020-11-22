import { Router } from 'express';
import { dataExportController } from '../components/dataExport/dataExport.controller';
import { apiMiddleware } from '../middleware/api.middleware';

class DataExportRoutes {

    public router: Router = Router();

    constructor() {
         this.config();
    }
    config(): void {
        this.router.get('/', apiMiddleware.checkApi, dataExportController.export);
    }
}

const dataExportRoutes = new DataExportRoutes();
export default dataExportRoutes.router; 
