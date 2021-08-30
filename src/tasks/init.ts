import type { Handler } from 'sade';
import {logger, prompt}from '../utils'

/**
 * cli初始化方法
 * @param {Handler} config 用户输入的命令行参数对象
 */
export default (config:Handler) => {
  logger.primary(`${config}`);
  promptCreate()
}

/**
 * 创建Prompt
 * @description 提供给用户选择模板类型，目前提供js和ts模板
 */
const promptCreate = async () => {
  const describe = ' 请选择项目模板'
  const list = ['js','ts']
  const answer = await prompt(describe, list)
  console.log(answer[describe])
  switch (answer[describe]) {
    case list[0]:
      // TODO 
      logger.success('初始化js')
      break;
    case list[1]:
      // TODO
      logger.success('初始化ts')
      break;
    default:
      logger.error('❌请选择对应的项目模板')
      break;
  }
}