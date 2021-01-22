import { createObjectCsvWriter } from 'csv-writer';

export class CSVHelper {
    /**
     * Writes the data into csv files, with a limit of 999 lines per file
     * @param fileName
     * @param data
     */
    async writeCSV(fileName: string, data: any[]) {
        const chunk = 997;
        for (let i = 0, j = data.length, index = 1; i < j; i += chunk, index++) {
            const csvWriter = this.createCSVWriter(fileName, index);
            await csvWriter.writeRecords(data.slice(i, i + chunk));
        }
    }

    /**
     * Creates and returns a new csv file
     * @param fileName
     * @param index
     */
    private createCSVWriter(fileName: string, index: number) {
        return createObjectCsvWriter({
            path: `src/outputs/datos_${fileName}_${index}.csv`,
            header: [
                { id: 'index', title: 'Indice' },
                { id: 'index_start_at', title: 'Indice comienza en' },
                { id: 'integer', title: 'Entero' },
                { id: 'float', title: 'Flotante' },
                { id: 'name', title: 'Nombre' },
                { id: 'surname', title: 'Apellido' },
                { id: 'fullname', title: 'Nombre completo' },
                { id: 'email', title: 'Email' },
                { id: 'bool', title: 'Booleano' },
            ],
        });
    }
}

export const csvHelper = new CSVHelper();
