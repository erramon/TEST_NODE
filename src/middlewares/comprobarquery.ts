import { Request, Response, NextFunction } from 'express';

const comprobarQuery = (req: Request, res: Response, next: NextFunction)=>{
    if(req.query && req.query.api && ['api1', 'api2'].includes(req.query.api.toString())){
        next();
    }else{
        return res.json('no hay parametros o no son correctos');
    }
}

export {
    comprobarQuery
}