// @ts-nocheck
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generator from '@babel/generator';
import * as t from '@babel/types';
import jetpack from 'fs-jetpack';
import YAML from 'yamljs';
import path from 'path';

export const mergeJSFile = (filename: string) => {
	let code = jetpack.read(path.resolve(jetpack.cwd(), filename));

	// 如果是JSON格式的文件需要处理一下
	if (filename.split('.').includes('json')) {
		code = `module.exports = ${code}`;
	} else if (filename.split('.').includes('yaml')) {
		code = JSON.stringify(YAML.parse(code));
		code = `module.exports = ${code}`;
	}
	const template = require(path.resolve(__dirname, `../../templates/.prettierrc.js`));

	const ast = parse(code || '');

	traverse(ast, {
		ObjectProperty: p => {
			const name = p.node.key.name;
			if (template[name] !== undefined) {
				p.node.value.value = template[name];
				delete template[name];
			}
		},
	});
	console.log(template);
	// 插入剩余的属性
	for (let key in template) {
		let value;
		switch (typeof template[key]) {
			case 'string':
				value = t.stringLiteral(template[key]);
				break;
			case 'number':
				value = t.numericLiteral(template[key]);
				break;
			case 'boolean':
				value = t.booleanLiteral(template[key]);
				break;
		}
		ast.program.body[0].expression.right.properties.push(
			t.objectProperty(t.identifier(key), value)
		);
	}
	const output = generator(ast, {}, code);
	jetpack.write(path.resolve(jetpack.cwd(), filename), output.code);
	filename !== '.prettierrc.js' &&
		jetpack.rename(path.resolve(jetpack.cwd(), filename), '.prettierrc.js');
};
