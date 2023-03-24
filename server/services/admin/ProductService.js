const ProductModel = require("../../models/ProductModel")

const ProductService = {
    add:({title,introduction,detail,productCover,editTime})=>{
        return ProductModel.create({title,introduction,detail,productCover,editTime})
    },
    getList:()=>{
        return ProductModel.find()
    },
    deleteList:(_id)=>{
        return ProductModel.deleteOne({_id})
    }
}

module.exports = ProductService