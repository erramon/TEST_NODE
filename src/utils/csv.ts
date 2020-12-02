import { writeFileSync, appendFileSync } from 'fs'
import { join } from 'path'
function toCsv(buf: Buffer){
    const str = buf.toString('utf8')
    const obj = JSON.parse(str)
    let files = 0;
    let fileRow = 0;
    const name_file_prefix = join(`${__dirname}/../../src/outputs/report-${new Date().getTime()}`)
    for(let key in obj.items){
        
        if(fileRow === 0){
            writeFileSync(`${name_file_prefix}${files}.csv`, `${Object.keys(obj.items[key]).join('---')}\n`)
            fileRow++
        }
        let valuesForItem: Array<string> = new Array();
        for(let key2 in obj.items[key]){
            valuesForItem.push(obj.items[key][key2])
        }

        appendFileSync(`${name_file_prefix}${files}.csv`, `${valuesForItem.join('---')}\n`)
        fileRow++
        if(fileRow === 998){
            fileRow = 0
            files++
        }
    }
    return true;
}
export const bufToCsv = toCsv; 