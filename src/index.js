import mpCi from './lib/ci'

function tyrGet(target){
    if(!target){
        return null
    }
    if(target instanceof Function){
        return target()
    }
    return target
}
export const run = function (options){
    const {config,baseConfig} = options
    try {
        const ci = new mpCi({config:tyrGet(config),baseConfig:tyrGet(baseConfig)})
        console.log(ci,55555)
        ci.init()
    }catch (err){
        console.log('初始化失败：'+ err)
    }
}
