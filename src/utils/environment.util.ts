/**
 * Get the environment file from 'src/config/' and return an object with it's properties.
 * The environment is selected considering the conf set in the 'NODE_ENV' variable from the '.env' file.
 *
 * @returns An object containing the info of the env file selected.
 *
 */
export function checkEnvironment(): any {
  const environment = require(`@config/${process.env.NODE_ENV}.json`);
  return environment ? environment : require(`@config/dev.json`);
}
