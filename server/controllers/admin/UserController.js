const UserService = require("../../services/admin/UserService")
const JWT = require('../../util/JWT')

const UserController = {
    login:async(req,res)=>{
        const {username,password} = req.body

        const result = await UserService.login(username,password)

        if(result.length===0){
            res.send({
                code:'-1',
                error:'用户名密码不匹配'
            })
        }else{//*成功登录
            const token = JWT.generate({
                _id:result[0]._id,
                username:result[0].username
            },'1d')

            res.header('Authorization',token)

            res.send({
                ActionType:'OK',
                info:{
                    username:result[0].username,
                    gender:result[0].gender?result[0].gender:0, //0保密 1男2女
                    introduction:result[0].introduction,
                    avatar:result[0].avatar,
                    role:result[0].role
                }
            })
        }
    },
    upload:async(req,res)=>{
        // console.log(req.body)
        console.log(req.file)
        const {username,introduction,gender} = req.body
        const avatarPath = `/avataruploads/${req.file.filename}`

        const token = req.headers['authorization'].split(' ')[1]
        const payload = JWT.verify(token)
        const {_id} = payload

        await UserService.upload({
            _id,
            username,
            introduction,
            gender:Number(gender),
            avatarPath
        }) 
        
        res.send({
            ActionType:'OK',
            info:{
                username,introduction,gender:Number(gender),avatarPath
            }
        })
    }
}

module.exports = UserController