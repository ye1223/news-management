const express = require('express')
const ProductRouter = express.Router()
const multer = require('multer')
const upload = multer({dest:'public/product-cover-uploads/'})
const ProductController = require('../../controllers/admin/ProductController')

ProductRouter.post('/adminapi/product/add',upload.single('file'),ProductController.add)

ProductRouter.get('/adminapi/product/lists/:userid',ProductController.getList)
ProductRouter.delete('/adminapi/product/list/:productid',ProductController.deleteList)



module.exports = ProductRouter