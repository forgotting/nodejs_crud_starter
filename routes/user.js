const Router = require('koa-router');
const userAccountController =require('../controller/userAccountController');
const response =require('../utility/response');
const router = Router();

////版本1: 叫用util內的function當作middleware
// const util = require('../utility/util');
//// example:
// router.get('/user/:id', util.getUserData, async(ctx)=>{
//     console.log(ctx.state.user);
//     let data = await userAccountController.getUser(ctx.params.id);
//     ctx.body=data;
// });

//版本2: route裡面制定要使用token取使用者資訊的api路徑
const { getUser } = require('../service/userAccountService');
const jwtUtil = require('../utility/jwt');

/*router.use(['/user/*', '/test/*'], async(ctx,next) => {  //需要使用此功能的api路徑需以陣列制定
    let userInfo = await getUser(ctx.state.user.user_id);
    ctx.state.user = {"role": userInfo.role, "user_id": userInfo.user_id, "username": userInfo.username};       //將使用者資訊往後傳，提供後續操作使用
    
    await next();
});*/
//-----版本2 end-----
/*router.get('/login', async(ctx)=>{
    console.log('test')
});*/

router.get('/test/:id', async(ctx)=>{
    console.log(ctx.state.user);
    let data = await userAccountController.getUser(ctx.params.id);
    ctx.body=data;
});

router.get('/user/:id', async(ctx)=>{
    console.log(ctx.state.user);
    let data = await userAccountController.getUser(ctx.params.id);
    ctx.body=data;
});

//user login
router.post('/users/login', async(ctx)=>{
    let data = await userAccountController.login(ctx.request.body);
     response.response(ctx,data);
});

//user logout
router.post('/users/logout', async(ctx)=>{
    console.log('test')
    ctx.response.body = response.responseSuccess("logout success");
});

//user list
router.get('/users', async(ctx)=>{
    let data = await userAccountController.getUser(ctx.params.id);
    ctx.body=data;
});

//Describe user
router.get('/users/:id', async(ctx)=>{
    let data = await userAccountController.getUserId(ctx.params.id);
    ctx.body=data;
});

//create user
router.post('/users',async(ctx)=>{
    let data = await userAccountController.createtUser(ctx.request.body);
    response.response(ctx,data);
});

//edit user
router.put('/users/:user_id', async(ctx)=>{
    let data = await userAccountController.updateUser(ctx.params.user_id, ctx.request.body);
    ctx.body=data;
});

//Change password
router.put('/users/actions/password/:user_id', async(ctx)=>{
    let data = await userAccountController.updateUserPassword(ctx.params.user_id, ctx.request.body);
    ctx.body=data;
});

//Assign group
router.put('/users/actions/assginGroups/:user_id', async(ctx)=>{
    let data = await userAccountController.updateUserGroup(ctx.params.user_id, ctx.request.body);
    ctx.body=data;
});

//Delete user
router.del('/users/:id',async(ctx)=>{
    let data = await userAccountController.deleteUser(ctx.params.id);
    response.response(ctx,data);
});

//#####################
router.post('/login',async (ctx)=> {
     let data = await userAccountController.login(ctx.request.body);
     response.response(ctx,data);
});

router.post('/login',async (ctx)=> {
    let data = await userAccountController.login(ctx.request.body);
    response.response(ctx,data);
});

module.exports = router;
