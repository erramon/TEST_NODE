import { dataExportService } from './dataExport.service';
import { Request, Response } from 'express';
import { ExportReport } from './entities/export-report.model';

class DataExportController {
  public async export(req: Request, res: Response): Promise<Response<any>> {
    const apiName: string = req.query.api as string;
    
    const report: ExportReport = await dataExportService.export(apiName);

    return res.status(200).json({
        ok: true,
        report   
    });
  }
}
export const dataExportController = new DataExportController();
