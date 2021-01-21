import { join } from 'path';
import { existsSync, mkdirSync, readdirSync, unlinkSync } from 'fs';

class FoldersUtils {

    private readonly OUTPUT_FOLDER_NAME = 'outputs';

    public checkExists(): FoldersUtils {
        this.checkOutputsFolder();
        this.checkCsvFolder();

        return this;
    }

    get patchCsvFolder() {
        return join(__dirname, '..', '..', this.OUTPUT_FOLDER_NAME, this.generateNameFolder());
    }

    private get pathOutputFolder() {
        return join(__dirname, '..', '..', this.OUTPUT_FOLDER_NAME)
    }

    private checkOutputsFolder(): void {
        if (FoldersUtils.checkFolder(this.pathOutputFolder)) {
            FoldersUtils.createFolder(this.pathOutputFolder);
        }
    }

    private checkCsvFolder(): void {
        if (FoldersUtils.checkFolder(this.patchCsvFolder)) {
            FoldersUtils.createFolder(this.patchCsvFolder);
        }
    }

    private generateNameFolder(): string {
        const now = new Date();
        return `${now.getFullYear()}-${now.getMonth() + 1}`
    }

    public removeOldCsv() {
        [...readdirSync(this.patchCsvFolder)]
            .map(file => unlinkSync(join(this.patchCsvFolder, file)))
    }

    private static checkFolder(path: string): boolean {
        return !existsSync(path)
    }

    private static createFolder(path: string): void {
        if (!existsSync(path)) {
            mkdirSync(path);
        }
    }
}

export default new FoldersUtils();