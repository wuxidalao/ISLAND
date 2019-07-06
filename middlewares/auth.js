const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
  constructor(level){
    //定义权限分级变量
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
  }

  get m(){
    return async (ctx,next)=>{
      const userToken = basicAuth(ctx.req)
      let errMsg = 'token不合法'

      if(!userToken || !userToken.name){
        throw new global.errs.Forbbiden(errMsg)
      }
      try {
        var decode = jwt.verify(userToken.name,global.config.security.secretKey)
      } catch (error) {
          if (error.name == 'TokenExpiredError'){
            errMsg = 'token已过期'
          }
        throw new global.errs.Forbbiden(errMsg)
      }

      if(decode.scope < this.level){
        errMsg = '权限不足'
        throw new global.errs.Forbbiden(errMsg)
      }

      ctx.auth = {
        uid:decode.uid,
        scope:decode.scope
      }
      await next()
    }
  }

  static verifyToken(token){
    //判断小程序用户令牌是否合法
    try{
      jwt.verify(token,global.config.security.secretKey)
      return true
    }
    catch(error){
      return false
    }
  }
}

module.exports = {
  Auth
}