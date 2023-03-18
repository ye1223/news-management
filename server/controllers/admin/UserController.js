const UserService = require("../../services/admin/UserService")

const UserController = {
    login:async(req,res)=>{
        const {username,password} = req.body

        let result = await UserService.login(username,password)

        if(result.length===0){
            res.send({
                code:'-1',
                error:'用户名密码不匹配'
            })
        }else{
            res.send({
                ActionType:'OK'
            })
        }
    }
}

module.exports = UserController