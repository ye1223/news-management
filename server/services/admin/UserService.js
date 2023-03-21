const UserModel = require("../../models/UserModel")

const UserService = {
    login:(username,password)=>{
       return UserModel.find({username,password})
    },
    upload:({_id,username,introduction,gender,avatarPath})=>{
        return UserModel.updateOne({_id},{
            username,introduction,gender,avatarPath
        })
    },
    add:({username,introduction,gender,avatarPath,role,password})=>{
        return UserModel.create({
            username,
            introduction,
            gender,
            avatarPath,
            role,
            password
        })
    },
    getList:()=>{
        return UserModel.find({},['username','role','introduction','gender','avatarPath'])
    }
}
 
module.exports = UserService