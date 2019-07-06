const requireDirectory = require("require-directory");
const Router = require("koa-router");

class InitManager {
  static initCore(app){
    //入口方法
    InitManager.app = app
    InitManager.initLoadRouters()
    InitManager.loadHttpException()
    InitManager.loadConfig()
  }

  static loadConfig(path = ''){
    //使用global方法导入全部的类
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }

  static initLoadRouters() {
    //process.cwd()求路径
    const apiDirectory = `${process.cwd()}/app/api`
    requireDirectory(module, apiDirectory, {
      visit: whenLoadMdule
    });

    function whenLoadMdule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes());
      }
    }
  }

  static loadHttpException(){
    //每当应用程序启动的时候，都会把http-exception里的类都装载到global里，使用global方法导入全部的类
    const errors = require('./http-exception')
    global.errs = errors
  }
}

module.exports = InitManager
