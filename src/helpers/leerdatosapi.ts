import fs from 'fs';
import path from 'path';

import axios from 'axios';

import { Dato }  from '../interfaces/dato'

class DatosApi{

    async devolverApi(api:string){
        return await axios.get(api);
    }
    
    devolverMocksData(api:string):Dato[]{
        const ruta = path.join(__dirname, `../../mocksdata/mocksapi${api}backup.json`);
        try{
            if(fs.existsSync(ruta)){
                const info = fs.readFileSync(ruta, {encoding:'utf-8'});
                return JSON.parse(info).items;
            }else{
                return [];
            }
        } catch{
            return [];
        }
    }

}

export {
    DatosApi
}
