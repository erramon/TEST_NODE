import { IConfig } from "../models/config.model"

export class AppConfig {

  static getBasePath = (): string => process.cwd()

  private static getEnviroment = (): string => process.env.NODE_ENV

  static getConfig = (): IConfig => require(`${AppConfig.getBasePath()}/src/config/${AppConfig.getEnviroment()}.json`)
  
}