const { sequelize } = require("@core/db"); //实例化的sequelize
const { Sequelize, Model } = require("sequelize"); //导入原来的Sequelize包

class Comment extends Model {
  static async addComment(bookID, content) {
    const comment = await Comment.findOne({
      where: {
        book_id: bookID,
        content
      }
    });
    if (!comment) {
      return await Comment.create({
        book_id: bookID,
        content,
        nums: 1
      });
    } else {
      return await comment.increment("nums", {
        by: 1
      });
    }
  }

  static async getComments(bookID){
    const comments = await Comment.findAll({
      where:{
        book_id:bookID
      }
    })
    return comments
  }

  // toJSON(){
  //   //返回需要的模型
  //   return {
  //     content:this.getDataValue('content'),
  //     nums:this.getDataValue('nums')
  //   }
  // }
}

// Comment.prototype.exclude = ["nums"];
//指定要删除的字段 不建议在模型上使用就写死了 正确用法是在每个api里返回时使用

Comment.init(
  {
    content: Sequelize.STRING(12),
    nums: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    book_id: Sequelize.INTEGER
    // exclude:['book_id','id']
  },
  {
    sequelize,
    tableName: "comment"
  }
);

module.exports = {
  Comment
};
