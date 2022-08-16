class ApiError extends Error {
    constucture (statusCode, message){
        this.super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ApiError;