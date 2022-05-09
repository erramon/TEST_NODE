import * as fs from 'fs';

class InitEvironment {

    loadEnv(): void {
        const envFileName = process.env.NODE_ENV.trim();
        const envFilePath = `src/config/${envFileName}.json`;
        try {
            const envFileData = JSON.parse(fs.readFileSync(envFilePath, 'utf8'));
            Object.keys(envFileData.API_MOCS).forEach(api => {
                process.env[api] = envFileData.API_MOCS[api].url;
            });
        } catch (error) {
            console.error(`File ${envFileName}.json not found in directory config`);
        }
    }
}

export default new InitEvironment();
