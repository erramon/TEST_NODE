import CreateCSV from './createCSV';
import utils from '../utils';

class Core {
    private api: string;
    
    constructor( api: string ) {
        this.api = api;
    }

    async start(): Promise<void> {
        utils.folder.checkExists().removeOldCsv();
        const createCSV = new CreateCSV( this.api );
        createCSV.start();
    }
}

export default Core;