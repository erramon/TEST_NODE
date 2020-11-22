import fs from 'fs';
import path from "path";

export async function removeOldFiles(folder: string) {
    const files = fs.readdirSync('src/outputs/' + folder);

    for (const file of files) {
        fs.unlink(path.join('src/outputs/' + folder, file), (error: NodeJS.ErrnoException) => {
            if (error) {
                console.error(error);
            }
        });
    }
}