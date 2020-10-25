
export class JsonLoaderService {
    
    public async loadFile(file:any) {
        const loadJsonFile = require('load-json-file'); // importar módulo para leer json
        return loadJsonFile(file); // retorna el valor del json extraído con el método loadJsonFile.
    }

}


export const jsonLoaderService = new JsonLoaderService();