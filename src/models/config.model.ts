import { JSONConfig } from "../components/dataExport/entities/jsonConfig.model";

export default class Config {
    api1: string;
    api2: string;

    constructor(config: Config = {} as any) {
        this.api1 = config.api1;
        this.api2 = config.api2;
    }
    
    static fromJSON(jsonConfig: JSONConfig): Config {
        return new Config({
            api1: jsonConfig.API_MOCS.api1.url,
            api2: jsonConfig.API_MOCS.api2.url
        })
    }
}
