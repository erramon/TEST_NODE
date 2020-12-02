import {readFileSync, existsSync} from 'fs'
import { join } from 'path'
function parseConfigStrToObj(str: string):Object{
    try{
        return JSON.parse(str);
    }catch(err){
        console.error(new Error(err).stack)
        throw new Error(err)
    }
}
function getConfig():any{
    let envMode = process.env.NODE_ENV
    const envPath=join(`${__dirname}/../config/${envMode}.json`)
    if(!existsSync(envPath)){
        envMode='dev'
    }
    return parseConfigStrToObj(readFileSync(envPath, 'utf8' ));
}
export const config = getConfig()