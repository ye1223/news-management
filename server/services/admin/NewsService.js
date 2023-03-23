const NewsModel = require('../../models/NewsModel')
const NewsService = {
    add:({title,category,content,isPublish,coverPath,editTime})=>{
        return NewsModel.create({
            title,category,content,isPublish,coverPath,editTime
        })

    },
    getList:(_id)=>{
        if(_id){
            return NewsModel.find({_id},{})
        }
        return NewsModel.find()
    },
    publish:({_id,isPublish,editTime})=>{
        return NewsModel.updateOne({_id},{isPublish,editTime })
    },
    deleteList:(_id)=>{
        return NewsModel.deleteOne({_id})
    }
}

module.exports = NewsService