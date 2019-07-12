const bcrypt = require("bcryptjs");
const { sequelize } = require("@core/db");//实例化的sequelize
const { Sequelize, Model } = require("sequelize");//导入原来的Sequelize包

class User extends Model {
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email
      }
    });
    if (!user) {
      throw new global.errs.NotFound("账号不存在");
    }
    const correct = bcrypt.compareSync(plainPassword, user.password);
    //compareSync解密密码
    if(!correct){
      throw new global.errs.AutFailed('密码不正确')
    }
    return user
  }

  static async getUserByOpenid(openid){
    //查询是否存在此微信用户
    const user = await User.findOne({
      where:{
        openid
      }
    })
    return user
  }

  static async registerByOpenid(openid){
    //新增微信用户
    return await User.create({
      openid
    })
  }
}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,//设置为主键（主键：不能重复、不能为空）
      autoIncrement: true,//自动增长id编号（1、2、3……）
    },
    nickname: Sequelize.STRING,
    email: {
      type: Sequelize.STRING(128),
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      set(val) {
        const salt = bcrypt.genSaltSync(10);
        //生成盐
        const psw = bcrypt.hashSync(val, salt);
        //加密
        this.setDataValue("password", psw);
        //把加密过的密码保存到数据库里
      }
    },
    openid: {
      type: Sequelize.STRING(64),
      unique: true
    }
  },
  {
    sequelize,
    tableName: "user"//表名
  }
);

module.exports = { User };
