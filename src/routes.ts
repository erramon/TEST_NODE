import { Router } from "express";

import { dataBackupController } from "@components/controllers/data-backup.controller";
import { checkRequestedApiValidity } from "@components/middlewares/checkApiValidity";

class RegisterRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }
  config(): void {
    this.router.get("/", checkRequestedApiValidity, dataBackupController.index);
  }
}

const registerRoutes = new RegisterRoutes();
export default registerRoutes.router;
