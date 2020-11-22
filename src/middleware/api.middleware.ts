
import * as url from 'url';
import { ParsedUrlQuery } from "querystring";
import {  Request, Response, NextFunction } from 'express';
import Config from '../models/config.model';
import { getConfig } from '../utils/getConfig.util';

class ApiMiddleware {
    checkApi(req: Request, res: Response, next: NextFunction) {
        const config: Config = getConfig();
        const query: ParsedUrlQuery = url.parse(req.url, true).query;
        const apiName: string = query.api as string;

        if (!query?.api || !Object.keys(config).includes(apiName)) {
            res.status(400).json({
                ok: false,
                error: 'Invalid api value'
            });
        } else {
            next();
        }
    }
}
export const apiMiddleware = new ApiMiddleware();
