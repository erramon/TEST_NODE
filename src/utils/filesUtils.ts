import { mkdirSync, rmdirSync, appendFile } from 'fs';
import { AppConfig } from './appConfig';

export class FileUtils {

  static createDirectory = (path: string): void => 
    mkdirSync(`${AppConfig.getBasePath()}${path}`)
  

  static resetDirectory = (path: string): void => 
    rmdirSync(`${AppConfig.getBasePath()}${path}`, { recursive: true })
  

  static appenData = (data: any | any[], filename: string): Promise<void> => 
   new Promise((resolve, reject) => 
      appendFile(
        `${AppConfig.getBasePath()}/src/outputs/${filename}.csv`,
         data,
         () => resolve()
      )
    )

}
