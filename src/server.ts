import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
//Imports
import { cfgLoader } from './utils/loadCfg';
import { envDetails } from './interfaces/envModes';

const dotenv = require('dotenv');
dotenv.config();  

import RegisterRoutes from './routes';
import { url } from 'inspector';

class Server {
  public app: Application;
  public info: envDetails;

  constructor() {
    this.app = express();
    this.info = cfgLoader.load();
    this.config();
    this.routes();
  }

  config(): void {
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes(): void {
    this.app.use('/', RegisterRoutes);
  }

  start() {
    
    return this.app.listen(this.app.get('port'), () => {
      console.log('Server on port:', this.app.get('port'));
      console.log(`Enviroment selected: ${process.env.NODE_ENV}`); 
      console.log("Enviroment APIs :");
      console.log('api 1 url: '+this.info.API_MOCS.api1.url, '\napi 2 url: '+ this.info.API_MOCS.api2.url);
    });
  }
}

const server = new Server();
module.exports = server.start();
