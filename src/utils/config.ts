import fs from 'fs';
import path from 'path';

const env = process.env.NODE_ENV;

const leerConfig = ()=>{
    const ruta = path.join(__dirname, `../config/${env}.json`);
    try{
        if(fs.existsSync(ruta)){
            const info = fs.readFileSync(ruta, {encoding:'utf-8'});
            return (JSON.parse(info));
        }else{
            throw new Error('no existe el archivo de configuracion de entorno');
        }
    } catch{
        throw new Error('no se puede recuperar el archivo de configuracion de entorno');
    }
} 

const config = leerConfig();


export {
    config
}