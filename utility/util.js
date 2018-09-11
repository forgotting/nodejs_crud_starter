const { getUser } = require('../service/userAccountService');
const jwtUtil = require('../utility/jwt');

exports.getUserData = async(ctx, next)=>{
        // let verifyResult = await jwtUtil.tokenVerify(ctx);
        // let userInfo = await getUser(verifyResult.user_id);
        let userInfo = await getUser(ctx.state.user.user_id);
        //將使用者資訊往後傳，提供後續操作使用
        ctx.state.user = {"role": userInfo.role, "user_id": userInfo.user_id, "username": userInfo.username};
        
        await next();
    
}