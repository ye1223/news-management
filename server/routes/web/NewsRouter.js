const express = require('express')
const NewsRouter = express.Router()
const NewsController = require('../../controllers/web/NewsController')


NewsRouter.get('/webapi/news/lists',NewsController.getList)

module.exports = NewsRouter