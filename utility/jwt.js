const jwt = require('jsonwebtoken');
const util = require('util');
const jwtConfig = require('../config/default.json').jwt;
const verify = util.promisify(jwt.verify) ;
const expireTime = "1h";

module.exports={
    tokensign:async(_userToken)=>{
        //需確定token是固定格式或依傳入資訊變動產生
        let userToken = {
            "_id": _userToken._id,
            "user_name": _userToken.user_name,
            "role": _userToken.role,
            "approved": _userToken.approved
        }

        let token = jwt.sign(userToken, jwtConfig.secret, {expiresIn: expireTime});
        return token;
    },
    tokenVerify:async(ctx)=>{
        let token = ctx.header.authorization;
        //let payload = await verify(token.split(' ')[1], jwtConfig.secret);
        if (token) {
            let payload = await verify(token.split(' ')[1], jwtConfig.secret);
            return payload;
        } else {
            return "";
        }
        //return payload;
    },
    tokenRefresh:async(oldtoken)=>{
        let payload = jwt.decode(oldtoken, jwtConfig.secret);
        let refreshedtoken = jwt.sign({"user_id": payload.user_id}, jwtConfig.secret, {expiresIn: expireTime});
        return refreshedtoken;
    }

}