import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
const dotenv = require('dotenv');
dotenv.config();  

import RegisterRoutes from './routes';
import InitEvironment from './utils/init-evironment';

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.setEnv();
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

  setEnv() {
    InitEvironment.loadEnv();
  }

  routes(): void {
    this.app.use('/', RegisterRoutes);
  }

  start() {    
    return this.app.listen(this.app.get('port'), () => {
      console.log('Server on port:', this.app.get('port'));
      console.log(`Enviroment: ${process.env.NODE_ENV}`); 
      console.log(`Enviroment API1: ${process.env.api1}`); 
      console.log(`Enviroment API2: ${process.env.api2}`); 
    });
  }
}

const server = new Server();
module.exports = server.start();
