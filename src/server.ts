import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { readdir, unlink } from 'fs';
import { join } from 'path'
const dotenv = require('dotenv');
dotenv.config();  

import RegisterRoutes from './routes';

class Server {
  public app: Application;

  constructor() {
    this.app = express();
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

    readdir(join(`${__dirname}/../src/outputs/`), (err, files) => {
      if (err) throw err;

      for (const file of files) {
        unlink(join(`${__dirname}/../src/outputs/`, file), err => {
          if (err) throw err;
        });
      }
    });
    return this.app.listen(this.app.get('port'), () => {
      console.log('Server on port:', this.app.get('port'));
      console.log(`Enviroment: ${process.env.NODE_ENV}`); 
    });
  }
}

const server = new Server();
module.exports = server.start();
