const userAccountService =require('../service/userAccountService');
const response =require('../utility/response');
module.exports = {  
    login:async(body) => {
      
        if(!body.user_name || !body.password){
            return  response.responseError(401,"password error");
        }else{
            let data = await userAccountService.login(body);
            return data;
        }
    },

    getUserId:async(userid) => {
        let userInfo = await userAccountService.getUserId(userid);
        if(userInfo)
            return userInfo;
        else
            return response.responseError(404,"Not exist user");
    },

    createtUser: async(body) => {
        let result = await userAccountService.createtUser(body);

        return result;
    },

    getUser:async() => {
        let userInfo = await userAccountService.getUser();
        if(userInfo)
            return userInfo;
        else
            return response.responseError(404,"Not exist user");
    },

    updateUser:async(userid, body) => {
        let userInfo = await userAccountService.updateUser(userid, body);
        if(userInfo)
            return userInfo;
        else
            return response.responseError(404,"Not exist user");
    },

    updateUserPassword:async(userid, body) => {
        let userInfo = await userAccountService.getUserId(userid);
        if (userInfo.password === body.old_password) {
            let userInfo = await userAccountService.updateUserPassword(userid, body);
            return userInfo;
        } else {
            return response.responseError(404,"Not exist user");
        }
    },

    updateUserGroup:async(userid, body) => {
        let userInfo = await userAccountService.updateUserGroup(userid, body);
        if(userInfo)
            return userInfo;
        else
            return response.responseError(404,"Not exist user");
    },

    deleteUser:async(userid) => {
        let result = await userAccountService.deleteUser(userid);
        if(result)
            return result;
        else
            return response.responseError(404,"Not exist user");
    },
}


