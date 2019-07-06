const { sequelize } = require("@core/db"); //实例化的sequelize
const { Sequelize, Model, Op } = require("sequelize"); //导入原来的Sequelize包
const {Art} = require('@models/art')

class Favor extends Model {
  // 课堂笔记：数据库事务：保证数据库数据的一致性
  //ACID 原子性 一致性 隔离性 持久性
  static async like(art_id, type, uid) {
    // 点赞业务
    const favor = await Favor.findOne({
      //数据库查询是否有这三条数据
      where:{
        art_id,
        type,
        uid,
      }
    })
    if(favor){
      throw new global.errs.LikeError()
    }
    return sequelize.transaction(async t=>{
      //数据库操作，事务，保持数据的一致性
      await Favor.create({
        //添加数据
        art_id,
        type,
        uid,
      },{transaction:t})
      const art =await Art.getData(art_id,type,false)
      //用户点赞的期刊号、类型
      await art.increment('fav_nums',{by:1,transaction:t})
      //点赞+1操作
    })
  }

  //可以这么理解：Favor 类 未被实例化 表；favor 记录

  static async dislike(art_id, type, uid) {
    //取消点赞业务
    const favor = await Favor.findOne({
      //数据库查询是否有这三条数据
      where:{
        art_id,
        type,
        uid,
      }
    })
    if(!favor){
      throw new global.errs.DisLikeError()
    }
    return sequelize.transaction(async t=>{
      //数据库操作，事务，保持数据的一致性
      await favor.destroy({
        //删除数据
        force:true,  //false 软删除(数据表中记录仍然存在，但是在deleted_at生成时间戳)  true物理删除(数据表中直接删除)
        transaction:t
      })
      const art =await Art.getData(art_id,type,false)
      //用户点赞的期刊号、类型
      await art.decrement('fav_nums',{by:1,transaction:t})
      //点赞+1操作
    })
  }

  static async userLikeIt(art_id,type,uid){
    //当前的期刊是否点了赞
    const favor = await Favor.findOne({
      where:{
        uid,
        art_id,
        type,
      }
    })
    return favor ? true : false
  }

  static async getMyClassicFavors(uid){
    // 查询当前用户喜欢的列表
    const arts = await Favor.findAll({
      where: {
        uid,
        type:{
          [Op.not]:400
          // type不等于400的写法，借助sequelize语法
        }
      }
    })
    if(!arts){
      throw new global.errs.NotFound()
    }
    return await Art.getList(arts)
  }

  static async getBookFavor(uid,bookId){
    const favorNums = await Favor.count({//count()统计查询结果数
      //这本书籍点赞数量
      where:{
        art_id:bookId,
        type:400
      }
    })
    const myFavor = await Favor.count({
      //我是否对这本书籍点赞
      where:{
        art_id:bookId,
        uid,
        type:400
      }
    })
    return {
      fav_nums:favorNums,
      like_status:myFavor?1:0
      //三元判断我是否喜欢，喜欢返回1，否则返回0
    }
  }

}

Favor.init({
  uid: Sequelize.INTEGER, //用户  数字类型
  art_id: Sequelize.INTEGER, //期刊号
  type: Sequelize.INTEGER //期刊类型（音乐、电影、书籍等）
},{
  sequelize,
  tableName:'favor'
});

module.exports = {
  Favor
}