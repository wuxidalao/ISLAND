module.exports = {
  environment:'dev',
  //prod生产环境
  //dev开发环境
  database:{
    dbName:'island',
    host:'localhost',
    port:3306,
    user:'root',
    password:'123456'
  },
  security:{
    secretKey:'abcdefg',
    expiresIn:60*60*24*30
    //令牌的过期时间   开发阶段参数可以长点，上线后时间大概为2小时
  },
  wx:{
    appId:'wxd0dd59167d6221ff',
    appSecret:'7a54949ca189c64d7e1529977f340469',
    loginUrl:'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code',
  },
  yushu:{
    detailUrl:'http://t.yushu.im/v2/book/id/%s',
    keywordUrl:'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
  },
  host:'http://localhost:3000/'
}