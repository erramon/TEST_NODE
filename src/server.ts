import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { emptyDirectoryHelper } from './helpers/empty-directory.helper';
const dotenv = require('dotenv');
dotenv.config();
require('./utils/utils');

import RegisterRoutes from './routes';

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.clearDirectory();
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

    /**
     * Call this function at the beginning of the process in order to empty the outputs folder
     */
    clearDirectory() {
        emptyDirectoryHelper.clear('src/outputs');
    }

    start() {
        return this.app.listen(this.app.get('port'), () => {
            console.log('Server on port:', this.app.get('port'));
            console.log(`Enviroment: ${process.env.NODE_ENV}`);
        });
    }
}

const server = new Server();
module.exports = server.start();
