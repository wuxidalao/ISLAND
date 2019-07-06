const { sequelize } = require("@core/db"); //实例化的sequelize
const { Sequelize, Model } = require("sequelize"); //导入原来的Sequelize包

class Flow extends Model {}

Flow.init({
  index: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER
},{
  sequelize,
  tableName:'flow'
});

module.exports = {Flow}
