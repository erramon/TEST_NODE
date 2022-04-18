import fs from 'fs';
import path from 'path';

import { DatosApi } from './leerdatosapi'
import { Dato }  from '../interfaces/dato'

const datosApi = new DatosApi();

class Archivos{
    
    constructor(){
        this.creaDirectoriosOutput();
    }

    async creaDirectoriosOutput(){
        const base = path.join(__dirname, `../outputs`);
        const ruta = path.join(__dirname, `../outputs/api1`);
        const ruta2 = path.join(__dirname, `../outputs/api2`);
        try{
            await fs.mkdirSync(base);
            await fs.mkdirSync(ruta);
            await fs.mkdirSync(ruta2);
        }catch{
            console.log('el directorio ya existe');
        }
    }

    async crearCsv(api:string){
        //elegimos api
        const carpeta = api === '1'? 'api1' : 'api2';
        //construimos ruta a la carpeta de output del api
        const ruta = path.join(__dirname, `../outputs/${carpeta}`);
        //limipiamos la carpeta
        await this.limpiaOutputs(ruta);
        //extraemos datos del api
        const data:Dato[] = datosApi.devolverMocksData(api);
        //variables de control para el bulce de creacion de csv
        const total = data.length;
        let ciclo = 0;
        //separamos los datos en bloques de 999 elementos y lo enviamos a escribir en formato csv
        for(let i = 0; i < total;i += 999){    
            const lineas = data.slice(i, i+999);
            this.escribeArchivo(lineas, path.join(`${ruta}/data_${ciclo++}.csv`)); 
        }

    }

    escribeArchivo(data:Dato[], ruta:string){
        let result = '';
        //creamos lineas del archivo con los datos recibidos
        data.forEach((linea:Dato)=>{
            result += linea.index + ';' +
                    linea.index_start_at + ';' +
                    linea.integer + ';' +
                    linea.float + ';' + 
                    linea.name + ';' +
                    linea.surname + ';' +
                    linea.fullname + ';' + 
                    linea.email + ';' + 
                    linea.bool + '\n'
        });
        //eliminamos el ultimo salto de linea
        result = result.slice(-result.length, -1);
        //escribimos el archivo
        try{
            fs.writeFileSync(ruta, result);
        }catch{
            console.log(`no se ha podido escribir el archivo:  ${ruta}`);
        }
        
    }

    async limpiaOutputs(ruta:string){
        //leemos los archivos del directorio
        const archivosLista = await fs.readdirSync(ruta);
        //recorremos los archivos y los eliminamos
        archivosLista.forEach(archivo => {
            try{
                fs.unlinkSync(path.join(ruta) + `/${archivo}`);
            }catch(e){
                console.log(e);
            }
        });
    }
}

export {
    Archivos
}