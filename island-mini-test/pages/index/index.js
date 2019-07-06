// import {Base64} from 'js-base64'
const {Base64} = require('js-base64')

Page({
  data: {
 
  },
  //事件处理函数
  onGetToken(){
    wx.login({
      success:(res)=>{
        if(res.code){
          wx.request({
            url:"http://localhost:3000/v1/token",
            method:'POST',
            data:{
              account:res.code,
              type:100
            },
            success:(res)=>{
              console.log(res.data)
              const code = res.statusCode.toString()
              if(code.startsWith('2')){
                wx.setStorageSync('token',res.data.token)
              }
            }
          })
        }
      }
    })
  },

  onVerifyToken(){
    wx.request({
      url:'http://localhost:3000/v1/token/verify',
      method:'POST',
      data:{
        token:wx.getStorageSync('token')
      },
      success:res=>{
        console.log(res.data)
      }
    })
  },

  onGetLatest(){
    wx.request({
      url:'http://localhost:3000/v1/classic/latest',
      method:'GET',
      success: res => {
        console.log(res.data)
      },
      header:{
        Authorization: this._encode()
      }
    })
  },

  onLike(){
    wx.request({
      url:'http://localhost:3000/v1/like',
      method:'POST',
      data:{
        art_id:1,
        type:100
      },
      success:res=>{
        console.log(res.data)
      },
      header: {
        Authorization: this._encode()
      }
    })
  },

  onDisLike(){
    wx.request({
      url: 'http://localhost:3000/v1/like/cancel',
      method: 'POST',
      data: {
        art_id: 1,
        type: 100
      },
      success: res => {
        console.log(res.data)
      },
      header: {
        Authorization: this._encode()
      }
    })
  },

  onGetNext() {
    wx.request({
      url: 'http://localhost:3000/v1/classic/2/next',
      method: 'GET',
      success: res => {
        console.log(res.data)
      },
      header: {
        Authorization: this._encode()
      }
    })
  },

  onGetPrevious() {
    wx.request({
      url: 'http://localhost:3000/v1/classic/2/previous',
      method: 'GET',
      success: res => {
        console.log(res.data)
      },
      header: {
        Authorization: this._encode()
      }
    })
  },

  onGetClassicFavor(){
    wx.request({
      url: 'http://localhost:3000/v1/classic/100/1/favor',
      method: 'GET',
      success: res => {
        console.log(res.data)
      },
      header: {
        Authorization: this._encode()
      }
    })
  },

  onGetMyFavorList() {
    wx.request({
      url: 'http://localhost:3000/v1/classic/favor',
      method: 'GET',
      success: res => {
        console.log(res.data)
      },
      header: {
        Authorization: this._encode()
      }
    })
  },

  onGetClassicDetail() {
    wx.request({
      url: 'http://localhost:3000/v1/classic/200/2',
      method: 'GET',
      success: res => {
        console.log(res.data)
      },
      header: {
        Authorization: this._encode()
      }
    })
  },

  // 获取热门书籍列表
  onGetHotBookList() {
    wx.request({
      url: 'http://localhost:3000/v1/book/hot_list',
      method: 'GET',
      success: res => {
        console.log(res.data)
      },
      header: {
        Authorization: this._encode()
      }
    })
  },

  //获取书籍详情
  onGetBookDetail() {
    wx.request({
      url: 'http://localhost:3000/v1/book/1120/detail',
      method: 'GET',
      success: res => {
        console.log(res.data)
      },
      header: {
        Authorization: this._encode()
      }
    })
  },

  //搜索书籍
  onBookSearch(){
    wx.request({
      url: 'http://localhost:3000/v1/book/search',
      method: 'GET',
      data:{
        q:'东野',
        count:10
      },
      success: res => {
        console.log(res.data)
      },
      header: {
        Authorization: this._encode()
      }
    })
  },

  //获取我喜欢书籍的数量
  onGetMyFavorsBookCount(){
    wx.request({
      url: 'http://localhost:3000/v1/book/favor/count',
      method: 'GET',
      // like key%
      success: res => {
        console.log(res.data)
      },
      header: {
        Authorization: this._encode()
      }
    })
  },

  //获取书籍点赞情况
  onGetBookFavor(){
    wx.request({
      url: 'http://localhost:3000/v1/book/7/favor',
      method: 'GET',
      success: res => {
        console.log(res.data)
      },
      header: {
        Authorization: this._encode()
      }
    })
  },

  //新增短评
  onAddShortComment(){
    wx.request({
      url: 'http://localhost:3000/v1/book/add/short_comment',
      method: 'POST',
      data: {
        content: '123246466',
        book_id: 1120
      },
      // like key%
      success: res => {
        console.log(res.data)
      },
      header: {
        Authorization: this._encode()
      }
    })
  },

  //获取书籍短评
  onGetComments(){
    wx.request({
      url: 'http://localhost:3000/v1/book/1120/short_comment',
      method: 'GET',
      success: res => {
        console.log(res.data)
      },
      header: {
        Authorization: this._encode()
      }
    })
  },

    _encode() {
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token + ':')
    return 'Basic ' + base64
  }

})
