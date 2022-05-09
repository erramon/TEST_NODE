import { handlerFilesUtil } from '../../utils/handlerFiles';
import { usersBackUpService } from './usersBackUp.service';
import { BackUpResponse, User } from './models';
import { CONSTANTS } from '../../common/constants';

class UsersBackUpUtils {

    /**
     * Clean directory backups and init process create blocks
     * @param apiUrl 
     * @param api 
     * @returns {Promise<boolean[]>} A promises array that contains if blocks were created
     */
    async createBackup(apiUrl: string, api: string): Promise<boolean[]> {
        const path = `src/outputs/${api}`;
        const MAX_BLOCK_LINES = 999;
        let isCreatedBlocks: boolean[];

        try {
            await handlerFilesUtil.cleanDirectory(path);

            const usersBackUpData = await usersBackUpService.getDataUsers(apiUrl);

            isCreatedBlocks = await this.createBlocks(usersBackUpData, path, MAX_BLOCK_LINES);

        } catch (err) {
            console.error(`Error create users backUp data url: ${apiUrl}`);
        }

        return isCreatedBlocks;
    }

    /**
     * Create Blocks by Maximum lines specified by parameter
     * @param dataUsers 
     * @param path 
     * @param maxLinesBlock 
     * @returns {Promise<boolean[]>} A promises array that contains if blocks were created
     */
    createBlocks(dataUsers: BackUpResponse, path: string, maxLinesBlock: number): Promise<boolean[]> {
        if (maxLinesBlock <= 0) throw 'Invalid max lines block';

        const promises: Promise<boolean>[] = [];
        const date = new Date();
        let block = 1;

        for (let i = 0; i < dataUsers.items.length; i += maxLinesBlock) {
            const usersByBlock = dataUsers.items.slice(i, i + maxLinesBlock);
            const dataBlock = usersByBlock.map((user: User) => Object.values(user).toString()).join('\n');
            const fileName = `${path}/${CONSTANTS.MONTH_NAMES[date.getMonth()]}_backup_${block++}.csv`;
            promises.push(handlerFilesUtil.writeFile(fileName, dataBlock));
        }

        return Promise.all(promises);
    }
}

export const usersBackUpUtils = new UsersBackUpUtils(); 