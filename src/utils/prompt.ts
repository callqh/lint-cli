import inquirer from 'inquirer';
import { logger } from './index';

export default async (
  describe: string,
  choices: string[],
  type?: string,
) => {
  return inquirer.prompt(
    [{ type: type || 'list', name: describe, choices: choices },]
  ).catch(error => {
    if (error.isTtyError) {
      logger.error(error)
    } else {
      logger.error(error)
    }
    return error
  })
}