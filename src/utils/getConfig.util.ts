import Config from '../models/config.model';
import { EnvTypes } from '../models/envTypes.enum';

export function getConfig(): Config {
    switch(process.env.NODE_ENV) {
        case (EnvTypes.dev):
            return Config.fromJSON(require('../config/dev.json'));

        case (EnvTypes.pre):
            return Config.fromJSON(require('../config/pre.json'));

        case (EnvTypes.pro):
            return Config.fromJSON(require('../config/pro.json'));

        default:
            console.error('Invalid environment value. Dev setted by default.');
            return Config.fromJSON(require('../config/dev.json'));
    }
}
