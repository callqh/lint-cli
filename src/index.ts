#!/usr/bin/env node
// @ts-ignore
import pkg from '../package.json';
import sade from 'sade';
import chalk from 'chalk';
import init from './init';

const version = pkg.version;
const cliName = Object.keys(pkg.bin)[0];
const prog = sade(cliName);
 
prog
  .version(version)
  .option('-c, --config','就是一些我没有想好的动态配置');

 
prog
  .command('init <pkg>')
  .describe('初始化项目中的eslint配置和prettier格式化内容')
  .example('create package')
  .option(
    '--template',
    `Specify a template. Allowed choices: [A,B,C]`
  )
  .example('init')
  .action(async (opts) => {
    init(opts)
    console.log(
      chalk.red(`初始化成功`)
    );
  });



prog.parse(process.argv, {
  unknown:(arg)=>`错误消息${arg}`
});