//Sequelize实例化配置  全局配置

const {Sequelize,Model} = require('sequelize')
const {unset,clone,isArray} = require('lodash')

//连接数据库的相关配置
const {
  dbName,//指定连接数据库名
  host,//数据库的ip地址localhost
  port,//端口，默认3306
  user,//名称root
  password//密码
} = require('../config/config').database

const sequelize = new Sequelize(dbName,user,password,{
  dialect:'mysql',//指定数据库类型  连接数据库需安装相关驱动 如（"mysql2": "^1.6.5",）
  host,
  port,
  logging:true,//每当Sequelize操作数据库时，会把原始命令在命令行中显示出来
  timezone:'+08:00',//如果不设置时间，Sequelize自动生成的时间会和北京时间相差8小时
  define:{
    //create_time updata_time delete_time 一条记录的创建、更新、删除时间
    timestamps:true,
    paranoid:true,
    createdAt:'created_at',
    updatedAt:'updated_at',
    deletedAt:'deleted_at',
    underscored:true,//驼峰命名转下划线命名
    scopes:{
      //让ctx.body中不要输出以下内容
      bh:{
        attributes:{
          exclude:['created_at','updated_at','deleted_at']
        }
      }
    }
  }
})

sequelize.sync({
  force:false,//自动生成表（一般多为false状态,开发阶段可以为true）
})

Model.prototype.toJSON = function(){
  //接口输出到前端 不想展示以下三个字段的的做法
  // let data = this.dataValues
  let data = clone(this.dataValues)//拷贝对象dataValues  防止数据表中的dataValues被删除  我们只需要输出的dataValues删除
  unset(data,'updated_at')//删除不想要的json字段
  unset(data,'created_at')
  unset(data,'deleted_at')

  for (key in data){
    // 服务器的图片路径加载方法
    if(key === 'image'){
      if(!data[key].startsWith('http'))
      //判断图片路径是否以http开头
      data[key] = global.config.host + data[key]
      //如果不是就加上服务器地址
    }
  }

  if(isArray(this.exclude)){
    this.exclude.forEach(
      (value)=>{
        unset(data,value)
      }
    )
  }
  return data
}

module.exports = {
  sequelize
}