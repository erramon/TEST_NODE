export interface Api {
  [key: string]: {
    url: string;
  };
}

export interface ConfigFile {
  [key: string]: Api;
}

export const env: string = process.env.NODE_ENV || 'dev';
/**
 * The configuration file depending on the environment
 */
export const configFile: ConfigFile = require(`@config/${env}.json`);

class EnvUtils {
  constructor() {}

  /**
   * Get the api url by name
   * @param apiName the name of the api
   * @returns the url of the api
   */
  public getApiUrl(apiName: string): string {
    const api = Object.keys(configFile).map(key => configFile[key][apiName])[0];
    if (api) {
      return api.url;
    }
    return null;
  }
}

export const envUtils = new EnvUtils();
