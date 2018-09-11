module.exports = {
    response:async (ctx, resData) => {
        if (resData && resData.status_code && resData.status_code > 200) {
            console.log('--1--')
            console.log(resData);
            if (ctx.response.status === 'number')
                ctx.response.status = resData.status_code;
            else
                ctx.response.status = resData.status_code
                ctx.response.body = resData;
        } 
        else
        {
            console.log('--2--')
            console.log(resData);
            ctx.response.status = resData.status_code
            ctx.response.body = resData;
        }
            
    },
    responseError: (errCode, errString) =>{
        /* Error message template */
        var errMsg = {          
                status: 'Fail',
                status_code: 400,
        };
        errMsg.status_msg = errString;
        errMsg.status_code = errCode;
    
        return errMsg;
    },
    responseSuccess: (data)=> {
        /* Error message template */
        var suMsg = {           
                status: 'OK',
                status_code: 200,
                data:data
        };
        return suMsg;
    }
}
