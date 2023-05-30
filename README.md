## mp-ci
⏱ 小程序持续集成 ci，基于[miniprogram-ci](https://www.npmjs.com/package/miniprogram-ci)实现

## 安装依赖
```shell
npm i @wangyuhan329/mp-ci
```
## 使用
- 添加脚本
```js
import {run} from '@wangyuhan329/mp-ci'

run({
    config() {
        return {
            appid: "wxsomeappid",
            type: "miniProgram",
            projectPath: path.resolve(process.cwd(), "./dist/"),
            privateKeyPath: path.resolve(process.cwd(), "./dist/"),
            ignores: ["node_modules/**/*"],
        };
    },
    baseConfig(){
        return{
            version:'miniProgram_version',
            desc:'上传版本',
            robot:'30',
            setting:{
                es6: true,
                es7: true,
            }
        }
    }
})
```
- 添加运行命令
```json
//在package.json中,等构建完毕之后执行此命令即可自动上传
  "scripts": {
    "mp-ci": "node xxx.js"
  },
```
- 在微信公众平台添加相关配置
  登录[微信公众平台](https://mp.weixin.qq.com)，前往 开发=>开发管理=>开发设置=>小程序代码上传，生成上传密钥，开启了上传白名单的话需要把 CI 物理机的 ip 加入到 ip 白名单

## 两个配置对象参数详情

### config

| 参数        | 描述                                                                            | 类型     | 默认值                | 必填 |
| ----------- | ------------------------------------------------------------------------------- | -------- | --------------------- | ---- |
| appid       | 小程序 appid                                                                    | string   | /                     | 是   |
| projectPath | 上传代码路径                                                                    | string   | /                     | 是   |
| type        | 显示指明当前的项目类型 miniProgram、miniProgramPlugin、miniGame、miniGamePlugin | string   | miniProgram           | 否   |
| ignores     | 排除的规则                                                                      | string[] | ['node_modules/**/*'] | 否   |
| keyType     | 密钥类型 file/raw                                                               | string   | file                  | 否   |


### baseConfig

| 参数        | 描述           | 类型                | 默认值                 | 必填 |
| ----------- |--------------|-------------------|---------------------| ---- |
| version       | 小程序 版本号      | string            | /                   | 是   |
| desc | 版本描述         | string            | /                   | 是   |
| robot        | 机器人号   | string            | 30                  | 否   |
| setting     |         | {es6:boolen,es7:boolen} | {es6:true,es7:true} | 否   |
