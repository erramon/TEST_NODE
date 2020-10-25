
import * as request from "request-promise-native";

export class RequestLoaderService {


    public async loadRequest(url:string) { // recibe la url extraída para definir la llamada GET
        var options = {
            uri: url
        };
      
        return await request.get(options); // lanza un GET para los datos de la respuesta a esa llamada 
    }

}


export const requestLoaderService = new RequestLoaderService();