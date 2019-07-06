require('module-alias/register')

const Koa = require("koa")
const parser = require('koa-bodyparser')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')

const app = new Koa()
app.use(parser())
app.use(catchError)
process.cwd()
InitManager.initCore(app)

app.listen(3000);
