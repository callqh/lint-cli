import inquirer from 'inquirer';
import { logger } from './index';

const prompt = async (describe: string, choices: string[], type?: string) => {
	return inquirer
		.prompt([{ type: type || 'list', name: describe, choices: choices }])
		.catch(error => {
			if (error.isTtyError) {
				logger.error(error);
			} else {
				logger.error(error);
			}
			return error;
		});
};

/**
 * 创建prompt
 * @param describe 描述
 * @param selectedList 可选择的列表
 * @returns 选择的值
 */
export const createPrompt = async (describe: string, selectedList: string[]) => {
	const answer = await prompt(describe, selectedList);
	return answer[describe];
};

export default createPrompt;
