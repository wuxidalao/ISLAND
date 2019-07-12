//枚举 js对象模拟的枚举 不是真正的枚举

function isThisType(val){
  //遍历参数
  for(let key in this){
    if(this[key] === val){
      return true
    }
  }
  return false
}

const LoginType = {
  USER_MINI_PROGRAM:100,//小程序登录方式
  USER_EMAIL:101,//emal登录方式
  USER_MOBILE:102,//手机登录方式
  ADMIN_EMAIL:300,//管理员email登录方式
  isThisType
}

const ArtType = {
  MOVIE:100,
  MUSIC:200,
  SENTENCE:300,
  BOOK:400,
  isThisType
}

module.exports = {
  LoginType,
  ArtType
}