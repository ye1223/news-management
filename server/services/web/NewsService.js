const NewsModel = require('../../models/NewsModel')

const NewsService = {
    getList:({_id})=>{
        return _id?NewsModel.find({_id,isPublish:1}):NewsModel.find({isPublish:1}).sort({editTime:-1})

    },
    getTopLists:(limit)=>{
        return NewsModel.find({isPublish:1}).sort({editTime:-1}).limit(4)
    }
}

module.exports = NewsService