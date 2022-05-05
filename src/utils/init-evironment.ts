import * as fs from 'fs';

class InitEvironment {

    async loadEnv(): Promise<void> {
        const envFileName = process.env.NODE_ENV.trim();
        const envFilePath = `src/config/${envFileName}.json`;
        let envFileData;
        try {
            envFileData = JSON.parse(fs.readFileSync(envFilePath, 'utf8'));            
            process.env.api1 = envFileData.API_MOCS.api1.url;
            process.env.api2 = envFileData.API_MOCS.api2.url;
        } catch (error) {
            console.error(`File ${envFileName}.json not found in directory config`);
        }
    }
}

export default new InitEvironment();