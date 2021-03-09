import { Request, Response } from 'express';
import { get } from 'https';
import { IPatient } from '../models/patient.model';
import { AppConfig } from '../utils/appConfig';
import { CsvUtils } from '../utils/csvUtils';
import { FileUtils } from '../utils/filesUtils'
// Only for dev purpose
// import { MocksUtils } from '../utils/mocksUtils';

class MainController {

  private users: IUsers
  private pacient: IPatient

  public index = async (req: Request, res: Response): Promise<void> => {
    FileUtils.resetDirectory('/src/outputs')
    const api: string = req.query.api as string
    const url: string = this.getUrl(api)
    if (!url) {
      res.send({
        code: 404,
        message: 'not found'
      })
      return
    }
    FileUtils.createDirectory('/src/outputs')
    switch (api) {
      case 'api1':
        this.pacient = await this.download(url)
        break;
        case 'api2':
          // Only for dev purpose
          // this.users = await MocksUtils.getData(api.substring(4, 3))
        this.users = await this.download(url)
        break;
      default:
        break;
    }
    await this.handleData(api)
    res.send({
      code: 200,
      message: 'Done!'
    })
  };

  private getUrl = (api: string): string => {
    const { API_MOCS }: any = AppConfig.getConfig()
    return Object.keys(API_MOCS)
      .map(key => API_MOCS[key].url)
      .find((url: string) => url.includes(api))
  }

  private download(url: string): Promise<any> {
    return new Promise((resolve, rej) => {
      get(url, res => {
        let data: any
        res.on('data', chunk => data = chunk);
        res.on('end', () => resolve(JSON.parse(data.toString())));
      });
    });
  }

  private handleData = async (api: string): Promise<void> => {
      switch (api) {
        case 'api1':
          await CsvUtils.writeData(this.pacient.obtenerPrescripcion, api)
          break;
        case 'api2':
          await CsvUtils.writeData(this.users.items, api)
          break;
        default:
          break;
      }
    }
  
}

export const mainController = new MainController();
