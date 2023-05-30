import ci from 'miniprogram-ci'
export default class mpCi {
    constructor(options) {
        this.options = options
        this.project = null
    }

    init() {
        this.project = new ci.Project({...this.options.config})
        const baseConfig = () => ({
            project: this.project,
            version: this.options.baseConfig.version,
            desc: this.options.baseConfig.desc,
            robot: this.options.baseConfig.desc.robot || 30,
            setting: this.options.baseConfig.setting ?? {
                es6: true,
                es7: true,
            },
        })
        this.upload(baseConfig)
        this.preview(baseConfig)
    }

    upload(baseConfig) {
        ci.upload({
            ...baseConfig(),
            onProgressUpdate: ({_status, _msg}) => {
                if (_status === 'done') {
                    console.log(`🚁  ${_msg}\n`)
                }
            },
        }).then(({subPackageInfo}) => {
            console.log(
                '\n🌈 体验版上传成功\n\n' +
                '分包信息：\n' +
                subPackageInfo.reduce((pre, curr) => {
                    return pre + `${curr.name}: ${curr.size / 1000}kb\n`
                }, ''),
            )
        }).catch((e) => {
            console.log('\n🛠 体验版上传失败\n', e)
            process.exit(1)
        })
    }

    preview(baseConfig) {
        ci.preview({
            ...baseConfig(),
            onProgressUpdate: () => {
            },
            qrcodeFormat: 'base64',
            qrcodeOutputDest: 'qrcode.text',
        }).then(({subPackageInfo}) => {
            console.log(
                '\n🌈 预览上传成功\n\n' +
                '分包信息：\n' +
                subPackageInfo.reduce((pre, curr) => {
                    return pre + `${curr.name}: ${curr.size / 1000}kb\n`
                }, ''),
            )
        }).catch((e) => {
            console.log('\n🛠 预览上传失败\n', e)
            process.exit(1)
        })
    }
}
