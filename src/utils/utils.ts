const environment = process.env.NODE_ENV || 'dev';
const config = require(`../config/${environment}.json`);
Object.keys(config).forEach((key) => {
    const aux = config[key];
    Object.keys(aux).forEach((id) => {
        process.env[id] = aux[id].url;
    });
});
