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
        let isCreatedBlock: boolean[];

        try {
            await handlerFilesUtil.cleanDirectory(path);

            const usersBackUpData = await usersBackUpService.getDataUsers(apiUrl);

            isCreatedBlock = await this.createBlocks(usersBackUpData, path, MAX_BLOCK_LINES);

        } catch (err) {
            console.error(`Error create users backUp data url: ${apiUrl}`);
        }

        return isCreatedBlock;
    }

    /**
     * Create Blocks by Maximum lines specified by parameter
     * @param dataUsers 
     * @param path 
     * @param maxLinesBlock 
     * @returns {Promise<boolean[]>} A promises array that contains if blocks were created
     */
    createBlocks(dataUsers: BackUpResponse, path: string, maxLinesBlock: number): Promise<boolean[]> {
        const promises: Promise<boolean>[] = [];
        const date = new Date();

        let block = 1;
        let dataBlock: string[] = [];
        
        dataUsers.items.forEach((user: User, index: number) => {
            
            dataBlock.push(Object.values(user).toString());

            if (dataBlock.length === maxLinesBlock) {
                const fileName = `${path}/${CONSTANTS.MONTH_NAMES[date.getMonth()]}_backup_${block}.csv`;
                promises.push(handlerFilesUtil.writeFile(fileName, dataBlock.join('\n')));
                block++;
                dataBlock = [];
            }

            if (index === (dataUsers.items.length - 1) && dataBlock.length) {
                const fileName = `${path}/${CONSTANTS.MONTH_NAMES[date.getMonth()]}_backup_${block}.csv`;
                promises.push(handlerFilesUtil.writeFile(fileName, dataBlock.join('\n')));
                block++;
            }

        });

        return Promise.all(promises);
    }
}

export const usersBackUpUtils = new UsersBackUpUtils(); 