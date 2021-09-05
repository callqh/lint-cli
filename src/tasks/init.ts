import { logger, createPrompt } from '../utils';
import jetpack from 'fs-jetpack';
import path from 'path';
import spawn from 'child_process';

/**
 * cli初始化方法
 * @description 提供给用户选择模板类型，目前提供js和ts模板
 */
const init = async () => {
	const describe = ' 请选择项目模板';
	const list = ['js', 'ts'];
	const answer = await createPrompt(describe, list);

	switch (answer) {
		case list[0]:
			// TODO
			createEslintrc();
			createPrettierrc();
			break;
		case list[1]:
			// TODO
			createEslintrc();
			createPrettierrc();
			break;
		default:
			logger.error('❌请选择对应的项目模板');
			break;
	}

	logger.success('🎉 配置完成！');
	installDependencies();
};

// 模板文件的路径
const templatePath = path.resolve(__dirname, '../../templates');
/**
 * 创建eslint规则文件
 */
const createEslintrc = () => {
	const cwd_path = process.cwd();
	const has_eslintrc = jetpack.find(cwd_path, { matching: ['./.eslintrc.*'] });
	// 文件名
	const filename = '.eslintrc.js';
	// 不存在已有eslint配置
	if (has_eslintrc.length === 0) {
		logger.primary('🏄🏻 创建eslint文件...');
		// 从模板中复制到项目目录中
		jetpack.copy(path.resolve(templatePath, filename), path.resolve(cwd_path, filename));
	} else {
		// 已有相关eslint配置
		logger.warning('❗️已有eslint相关配置文件');
		// TODO: 进行配置合并
	}
};

/**
 * 创建prettier规则文件
 */
const createPrettierrc = () => {
	const cwd_path = process.cwd();
	const has_prettierrc = jetpack.find(cwd_path, { matching: ['./.prettierrc.*'] });
	const filename = '.prettierrc.js';

	if (has_prettierrc.length === 0) {
		logger.primary('🏄🏻创建prettier文件...');
		// 从模板中复制到项目目录中
		try {
			jetpack.copy(path.resolve(templatePath, filename), path.resolve(cwd_path, filename));
		} catch (error) {
			logger.error(`❌ 配置失败 ${error}`);
		}
	} else {
		// 已有相关eslint配置
		logger.warning('❗️已有prettier相关配置文件');
		// TODO: 进行配置合并
	}
};

/**
 * 安装所需要的依赖
 */
const installDependencies = async () => {
	logger.primary('依赖注入中...');
	// 新增依赖
	const devDependencies: { [key: string]: string } = {
		eslint: '^7.32.0',
		prettier: '^2.3.2',
		'@typescript-eslint/parser': '^4.30.0',
		'@typescript-eslint/eslint-plugin': '^2.31.0',
		'eslint-config-prettier': '^6.11.0',
		'eslint-plugin-prettier': '^3.1.3',
	};
	const package_path = path.resolve(jetpack.cwd(), 'package.json');
	const package_file = jetpack.exists(package_path);

	// 文件不存在
	if (!package_file) {
		// 执行初始化命令
		await spawn.exec('npm init -y');
	}

	const content = jetpack.read(package_path, 'json');
	// 合并配置
	content.devDependencies = {
		...content.devDependencies,
		...devDependencies,
	};

	await jetpack.writeAsync(package_path, content);
	logger.success('依赖注入成功！');
	// 选择安装依赖的工具
	const describe = ' 请选择您信赖的依赖安装工具';
	const list = ['npm', 'yarn', '达咩'];
	const answer = await createPrompt(describe, list);
	// 用户选择手动安装
	if (answer === list[2]) {
		logger.warning('为了确保插件生效，请手动执行 npm i 或者 yarn');
		return;
	}
	try {
		const prefix = answer === list[0] ? 'npm install' : 'yarn add';
		let res = `${prefix} `;
		for (let key in devDependencies) {
			res += `${key}@${devDependencies[key]} `;
		}
		spawn.exec(res);
	} catch (err) {
		logger.error((err as any).message);
	}
};

export default init;
