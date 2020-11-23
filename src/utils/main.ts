import * as dev from './../config/dev.json'
import * as pre from './../config/pre.json'
import * as pro from './../config/pro.json'


function main(){
    if (process.env.NODE_ENV === 'dev') {
        return dev;
    }
    else if (process.env.NODE_ENV === 'pre') {
        return pre;
    }
    else {
        return pro
    }
}
export const entorno = main()

