const bcrypt = require('bcryptjs')
const Router = require('koa-router')
const {success} = require('@lib/helper')
const {RegisterValidator} = require('@validators/validator')
const {User} = require('@models/user')
const router = new Router({prefix:'/v1/user'})

//新增数据post 更新put 查询get 删除delete
router.post('/register',async (ctx)=>{
  const v = await new RegisterValidator().validate(ctx)
  
  const user = {
    email:v.get('body.email'),
    // password:psw,
    password:v.get('body.password2'),
    nickname:v.get('body.nickname')
  }
    const r = await User.create(user)
    success()
})

module.exports = router
//router自动加载必须要导出