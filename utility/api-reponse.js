exports.apiSuccess = (req, res, message, data = null, pagination = null, statusCode = 200) => {
    const resData = {
        settings: {
            message: message,
            success: 1
        }
    };

    if (data !== null) {
        resData.data = data;
        if(pagination){
            resData.pagination = pagination;
        }
    }
    
    res.status(statusCode).json(resData);
}

exports.apiFailure = (req, res, message, statusCode, errorTrace = null) => {
    
    const resData = {
        settings: {
            message: message,
            success: 0
        }
    };
    if(errorTrace !== null){
        resData.error = errorTrace;
    }

    res.status(statusCode).json(resData);

}