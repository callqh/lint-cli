#!/usr/bin/env node
// @ts-ignore
import pkg from '../package.json';
import sade from 'sade';
import init from './tasks/init';

const version = pkg.version; //版本号

const cliName = Object.keys(pkg.bin)[0]; //包名称
const prog = sade(cliName);

prog.version(version).option('-c, --config', '就是一些我没有想好的动态配置');

prog
	.command('init')
	.describe('初始化项目中的eslint配置和prettier格式化内容')
	.example('lint init')
	.action(async () => {
		// 初始化
		await init();
	});

prog.parse(process.argv);
