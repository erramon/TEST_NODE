import { Error, ErrorsMap } from '../../models/errors.model';

class ErrorsUtils {
  private errorsApi: ErrorsMap

  constructor() {
    this.errorsApi = ErrorsUtils._errorsApi();
  }

  public getErrors(): { [t: string]: ErrorsMap } {
    return {
      API: this.errorsApi
    }
  }

  private static _errorsApi(): ErrorsMap {
    return {
      '001': ErrorsUtils.generateError('001', 'api-not-exists'),
      '002': ErrorsUtils.generateError('002', 'api-not-found', 404)
    }
  }
  
  private static generateError(
    error : string, 
    key   : string, 
    status: number = 400
    ): Error {
    return { error, key, status }
  }
}

export default new ErrorsUtils();