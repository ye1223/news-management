const jsonwebtoken = require('jsonwebtoken')

const secret = 'a random string'
const JWT = {
    generate(value,exipres){
        jsonwebtoken.sign(value,secret,{expiresIn:exipres})
    },
    verify(token){
        try{
            return jsonwebtoken.verify(token,secret)
        }catch(e){
            console.log(e)
        }
    }
}

module.exports = JWT