/*
  this file is responsible of paginate and convert to a valid CSV format the json response from the API requested.
  This also creates and writes the converted data into the destination folder, this's posible using "ManageDirectories.ts" file
  to validated and empty the directory folder as needed
*/
import fs from 'fs';
import path from 'path';
import directory from './manageDirectories';

class generateFiles {


  public saveIn: string;

  constructor(){
    
  }

    public async generateCSV(json: any, limitPerFile: number, SaveLocation: string, filesNames: string){
      
      let fields = Object.keys(json[0]);
      let limit = limitPerFile;
      let resLength = json.length;
      let keysLength = fields.length;

      //Using ceil to round to the right the number of files neccesary taking into consideration 
      //the file lines limits
      let totalFiles = Math.ceil(resLength/limit);
      this.saveIn = SaveLocation;
      let csv = "";
      let resRemaining = resLength;

      //validates the directory and clear out all the files before adding the new ones
      await directory.checkDirectory(this.saveIn);

      //first for loop to repeat as many times as files are necessary to storage all the data
      for(let t = 1; t < totalFiles+1; t++){  

        //second for loop to limitate the number of lines inside each files, also taking into consideration
        //the remaining json objects to avoid out of index 
        for(let i = 0; i < limitPerFile && i < resRemaining; i++){
          let line = "";

          //Third for loop to storage a variable with the CSV valid format.
          for(let j = 0; j < keysLength; j++){
            if (line != '') 
              line += ','
            line += json[i][fields[j]];              
          }

          //checking the end of file and the remaining json objects inside the response
          if(i !== limitPerFile-1 && i !== resRemaining-1)
            csv += line+'\r\n';
          else
            csv += line
        }

        //Removing the json objects that're already storage in the csv variable
        json.splice(0,limitPerFile);

        //Re calculating the length of the remnaining json objects from the response using a math formula
        //I decided to use this instead of ".length" method because with ".length" repeating over and over 
        //will be a time consuming instruction to repeat
        resRemaining = Math.abs(resLength - (t * limitPerFile));

        //creates and writes the files 
        this.createFile(filesNames+'-'+t+'.csv',csv);        
        csv = "";
      }
      console.log("Success "+totalFiles+" files generated");  
  }
    //Creates and writes the files
    private createFile(name: string, data: any){  
      const __dirname = path.resolve();
      let pathLocation = this.saveIn.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, '');
      fs.appendFile(path.resolve(__dirname, pathLocation)+'/'+name, data, function (err) {
        if (err) throw err;       
      });
    }
}

export const generateFile = new generateFiles();
  

