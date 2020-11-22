export class ExportReport {
    originApi: string;
    outDir: string;
    files: number;
    lines: number;

    constructor(report: ExportReport = {} as any) {
        this.originApi = report.originApi;
        this.outDir = report.outDir;
        this.files = report.files;
        this.lines = report.lines;
    }
}
