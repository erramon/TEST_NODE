import { parseAsync } from "json2csv"
import { FileUtils } from "./filesUtils"

export class CsvUtils {

  static writeData = async (data: any[], api: string) => {
    const max: number = 999
    let count: number = 0
    while(!!data.length) {
      const filename: string = `${CsvUtils.getMonth()}_${api}_${count}`
      await FileUtils.appenData(await parseAsync( data.slice(0, max), {}), filename)
      count++
      data = data.splice(max, data.length)
    }
  }

  static getMonth = (): string => {
    const months: string[] = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'july', 'aug', 'sep', 'oct', 'nov', 'dec']
    return months[new Date().getMonth()]
  }
}