import { Request, Response } from 'express';

import { Error } from '../../models/errors.model';
import utilsApi from './api.utils';
import Core from '../../core';

class ApiController {
    public async start( req: Request, res: Response ) {
        const api    = req.query.api as string;
        const errors: Error | void = utilsApi.checkApi( api );

        if (errors) {
            return res.status( errors.status ).json({
                state: 'error',
                error: errors.error,
                key  : errors.key
            });
        }

        const core = new Core( api );
        await core.start();
        
        res.send('Ok')
    }
}

export default new ApiController(); 