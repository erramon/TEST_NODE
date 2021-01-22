import {MocksApiResponse} from '../models/mocksApiResponse'
const https = require('https')


export async function csvRequest (url: any): Promise<MocksApiResponse> {
    return new Promise ((resolve, reject) => {
        https.get((url), (resp: any) => {
            const arrayResponse: Array<Buffer> = [];
            let response;
            resp.on('data', (data: Buffer) => {
                arrayResponse.push(data)
              })
            resp.on('end', () => {
                response = Buffer.concat(arrayResponse);
                const parsedResponse: MocksApiResponse = JSON.parse(response.toString());
                resolve(parsedResponse);
              })
        })
        .on("error", (error: any) => {
            reject(error);
          });
    });
} 



