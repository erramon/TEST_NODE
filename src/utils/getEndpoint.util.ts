import { getConfig } from "./getConfig.util";

export function getEndpoint(api: string): string {
    const config = getConfig();

    if (api === 'api1') {
        return config.api1;
    } else if (api === 'api2') {
        return config.api2;
    } else  {
        return null;
    }
}