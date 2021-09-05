# Lint-cli

 

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

 

 <!-- [![build status](https://github.com/liuqh0609/lint-cli/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/liuqh0609/lint-cli/actions) -->

一款可以帮助你省去配置eslint和prettier的工具，解放劳动力

> 目前仅支持ts项目

## 本地调试

1. 安装依赖 `npm i`
2. 打包项目`npm run start`
3. 创建软链`npm link`
4. 控制台输入`lint-cli xxx`，即可进行调试

## TODO

* [ ] 增加`js`相关的`lint`配置
* [ ] 增加 动态配置，用户添加语雀链接的文档，通过读出文件内容动态设置规则
* [ ] 增加 `commit lint`
* [ ] 增加 `release-it` 相关的版本发包依赖的配置
* [ ] `Rust`重构该插件（优先级低）
