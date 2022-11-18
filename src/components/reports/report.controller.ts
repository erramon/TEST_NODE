
import { Request, Response } from 'express';
import { Report } from '../../models/report.models';
import { getDataService } from "../../services/get-data.service";
import createCsv from '../../utils/create-csv';

class ReportController {
    public async generateReport(req: Request, res: Response) {
        try {
            let reports: Report[] = [];
            reports = await getDataService(req.query?.api);
            createCsv(reports);
            res.status(200).json({
                'message': `Total files processed for ${req.query.api}: ${reports.length}`
            });
        } catch (error) {
            res.status(400).json({
                'message': error
            });
        }
    }
}

export const reportController = new ReportController(); 
