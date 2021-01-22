export const environment = () => {
    const path = `../config/${process.env.NODE_ENV}.json`
    const env = require(path);
    env.port = process.env.PORT;
    env.environment = process.env.NODE_ENV
    console.log('Variables de entorno', env);
    return env;
}