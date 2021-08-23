import type { Handler } from 'sade';
console.log('初始化脚本')

export default (config:Handler) => {
  console.log( config);
}