const { sequelize } = require("@core/db");//实例化的sequelize
const { Sequelize, Model } = require("sequelize");//导入原来的Sequelize包

const classicFields = {
  image:Sequelize.STRING,
  content:Sequelize.STRING,
  pubdate:Sequelize.DATEONLY,
  fav_nums:{
    type:Sequelize.INTEGER,
    default:0
  },
  title:Sequelize.STRING,
  type:Sequelize.TINYINT,
}

class Movie extends Model{

}

Movie.init(classicFields,{
    sequelize,
    tableName:'movie'
  }
)

class Sentence extends Model{

}

Sentence.init(classicFields,{
    sequelize,
    tableName:'sentence'
  }
)

class Music extends Model{

}

const musicFields = Object.assign({
  //Object.assign()用于合并对象并返回
  url:Sequelize.STRING
},classicFields)

Music.init(musicFields,{
    sequelize,
    tableName:'music'
  }
)

module.exports = {
  Movie,
  Sentence,
  Music
}