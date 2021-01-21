import { join } from 'path';

type Api_Moc = { [api: string]: { url: string } }

class ConfigUtils {
    private environment: string;

    constructor() {
        this.environment = process.env.NODE_ENV
    }

    get fileConfiguration(): { API_MOCS: Api_Moc } {
        return this.getFile()
    }

    get getApiMocs(): Api_Moc {
        return { ... this.getFile() }['API_MOCS']
    }

    public getFile(): { API_MOCS: Api_Moc } {
        return require(ConfigUtils.getPathFileConfig(this.environment))
    }


    private static getPathFileConfig(environment: string): string {
        return join(__dirname, '..', '..', 'config', `${environment}.json`);
    }
}

export default new ConfigUtils();