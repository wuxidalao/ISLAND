const {HttpException} = require('@core/http-exception')

const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {

    const isHttpException = error instanceof HttpException
    const isDev = global.config.environment === 'dev'
    
    if(isDev && !isHttpException){
      throw error
    }

    if(isHttpException){
      //已知错误处理
      ctx.body = {
        msg:error.msg,
        error_code:error.errorCode,
        request:`${ctx.method} ${ctx.path}`,
      }
      ctx.status = error.code
    }
    else{
      //未知错误异常处理
      ctx.body = {
        msg:'we made a mistake 0(n_n)0~~',
        error_code:999,
        request:`${ctx.method} ${ctx.path}`,
      }
      ctx.status = 500 //服务器内部错误
    }
  }
};

module.exports = catchError
