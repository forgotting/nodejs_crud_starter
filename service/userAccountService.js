const user_modelInfo=require('../model/userModel');
const response =require('../utility/response');
const jwtUtil = require('../utility/jwt');

module.exports = {  
        getUserId:async(user_id)=>{
            let user_data =await user_modelInfo.findOne({"_id": user_id});
            return user_data;
        },
        getUser:async() => {
            let user_data =await user_modelInfo.find();
            return user_data;
        },
        deleteUser:async(user_id) => {
            let user_data =await user_modelInfo.findOneAndDelete({"_id": user_id});
            return  response.responseSuccess("delete success");
        },
        updateUser:async(user_id, body) => {
            let user_data =await user_modelInfo.findByIdAndUpdate(user_id, {$set:{"user_name":body.user_name, "role":body.role, "email":body.email, "groups":body.groups}}, {new: true,
                overwrite: true});
            return user_data;
        },
        updateUserPassword:async(user_id, body) => {
            let user_data =await user_modelInfo.findByIdAndUpdate(user_id, {$set:{"password":body.new_password}}, {new: true,
                overwrite: true});
            return user_data;
        },
        updateUserGroup:async(user_id, body) => {
            let user_data =await user_modelInfo.findByIdAndUpdate(user_id, {$set:{"groups":body.groups}}, {new: true,
                overwrite: true});
            return user_data;
        },
        createtUser: async(body)=>{
            try
            {
                await user_modelInfo.create({

                        "user_name":body.user_name,
                        "password":body.password,
                        "email":body.email,
                        "role":body.role,
                        "groups":body.groups,
                    });
                return  response.responseSuccess();
            }
            catch(e)
            {
                console.log(e); //怎麼回傳錯誤訊息?
                return response.responseError(400, e);
            }
        },
        login:async(body)=>{
            let userInfo =await user_modelInfo.findOne({"user_name":body.user_name}).then((res)=>{
                return res;
            }).catch((error)=>{
                console.log(error);
                return error;
            });
            if(body.password===userInfo.password){
                let user_payload = { "user_id":userInfo._id};
                return  response.responseSuccess({"token":await jwtUtil.tokensign(user_payload).then((result) => {return result;})});
            }else {
                return  response.responseError(401,"password error");

            }
        }
}