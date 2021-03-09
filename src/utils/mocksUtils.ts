import { readFileSync } from "fs"
import { AppConfig } from "./appConfig"

/**
 * @export
 * @class MocksUtils
 * Only for dev purpose
 */
export class MocksUtils {

  static getData = async (api: string): Promise<any> => {
    const path = `${AppConfig.getBasePath()}/src/mocksdata/mocksapi${api}backup.json`
    return JSON.parse(readFileSync(path, 'utf8'))
  }

}