import { Error, ErrorsMap } from '../../models/errors.model';
import utils from '../../utils/index';

class UtilsApi {
    public checkApi( api: string ): Error | void {
        const errorsApi: ErrorsMap = utils.errors.getErrors()['API'];

        if (UtilsApi.notExistsApi( api )) {
            return errorsApi['001'];
        }

        if (UtilsApi.notFoundApiInConfig( api )) {
            return errorsApi['002'];
        }
        
    }

    private static notExistsApi( api: string ): boolean {
        return !api
    }

    private static notFoundApiInConfig( api: string ): boolean {
        const mocs = utils.config.getApiMocs;
        return !mocs.hasOwnProperty( api );
    }
}

export default new UtilsApi();