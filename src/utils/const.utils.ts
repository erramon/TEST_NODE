export const env = process.env.NODE_ENV; //environment
export const conf = require(`../config/${env}.json`); //env.json
export const maxRecords = 998; //limit csv lines