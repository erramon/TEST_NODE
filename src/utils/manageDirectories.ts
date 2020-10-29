/*
    this file is responsible of creating / validating and cleaning out all the files inside the destination folder where the 
    archive are going to be storage
*/
import fs from 'fs';
import path from 'path';

class manageDirectories {

    public async checkDirectory (saveIn: string){
        return new Promise(function (resolve, reject) {
            let pathname = saveIn.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, ''); // Remove leading directory markers, and remove ending /file-name.extension
            let __dirname = path.resolve();
            let resolvedPath = path.resolve(__dirname, pathname);
            fs.promises.mkdir(resolvedPath, { recursive: true }).then(() => {
                fs.promises.readdir(resolvedPath).then(files=>{
                    if(files.length > 0){
                        for(let file of files){
                            fs.promises.unlink(path.join(resolvedPath, file));
                        }
                        resolve(true);         
                    }else {
                        resolve(true);
                    }        
                },error => {
                    reject(error);
                });  
            },error => {
                reject(error);            
            });
        }); 
    }
}

const directory = new manageDirectories();
export default directory;
