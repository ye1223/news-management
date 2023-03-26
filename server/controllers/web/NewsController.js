const NewsService = require('../../services/web/NewsService')
const NewsController = {
    getList:async (req,res)=>{
        const result = await NewsService.getList({_id:req.params._id})
        res.send({
            ActionType:'OK',
            newsLists:result
        })
    }
}

module.exports = NewsController