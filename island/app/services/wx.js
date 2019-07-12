//专门处理微信的业务逻辑

const util = require('util')
const axios = require('axios')
const {User} = require('@models/user') 
const {generateToken} = require('@core/util')
const {Auth} = require('@middlewares/auth')


class WXManager{
    static async codeToToken(code){
        //小程序用户登录原理，只需要code码（由微信小程序生成）
        //如果code合法，微信服务端将返回我们用户的openid 唯一标识
        //小程序用户自带唯一标识  无需我们注册

        // 鉴定小程序用户是否合法，传递三个参数
        // code 动态生成的
        // appid appsecret 每个小程序都会有这两个参数
        const url = util.format(global.config.wx.loginUrl,
            global.config.wx.appId,
            global.config.wx.appSecret,
            code)
        const result = await axios.get(url)
        if(result.status !==200){
            throw new global.errs.AuthFailed('oppid获取失败')
        }
        const errcode = result.data.errcode
        const errmsg = result.data.errmsg
        if(errcode){
            throw new global.errs.AuthFailed('oppid获取失败:'+errmsg)
        }

        let user = await User.getUserByOpenid(result.data.openid)
        if(!user){
            user = await User.registerByOpenid(result.data.openid)
        }
        return generateToken(user.id,Auth.USER)
        //生成令牌
    }
}

module.exports = {
    WXManager

}