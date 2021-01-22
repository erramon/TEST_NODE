import {Item} from '../models/item'
const path = require('path');
const jsoncsv = require('json-2-csv');
const fs = require('fs');


export async function deleteArchieves(api: any) {
    const pathApi = `src/outputs/${api}`
    const filesPath: Array<string> = fs.readdirSync(pathApi);
  
    filesPath.forEach(file => {
      const filePath = path.join(pathApi, file);
      fs.unlinkSync(filePath);
    });
  }
  
export async function convertJsonToCsV(items: Array<Item>, api: any) {
  
    try{
      const maxCsv: number = + process.env.MAX_CSV;
      let subItems = [];
      for(let i=0; i<items.length; i=i+maxCsv) {
        const item = items.slice(i, i+maxCsv)
        subItems.push(item);
      }
      subItems.forEach( async (subItem, index) => {
         await jsoncsv.json2csv(subItem, (err: any, csv: any) => {
          if (err) throw err;
          fs.writeFileSync(`src/outputs/${api}/archivo${index+1}.csv`, csv);
        });
      });
    }
    catch{
      return 'Se ha producido en error'
    }
  }