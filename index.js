const STATUS = [
    "OK": 200,
    "USER_ERROR": 400,
    "FATAL_ERROR": 500,
]

const Lambdab = module.exports = function(handler) {
    return async function(event) {
        return Promise.resolve().then(() => handler(event)).then((response) => {
            return {
                "statusCode": STATUS.OK,
                "headers": Lambdab.headers,
                "body": JSON.stringify(response)
            }
        }).catch((error) => {
            if(error instanceof Lambdab.UserError) {
                return {
                    "statusCode": STATUS.USER_ERROR,
                    "headers": Lambdab.headers,
                    "body": JSON.stringify({
                        "message": error.message
                    })
                }
            } else {
                console.log(error, error.stack)
                return {
                    "statusCode": STATUS.FATAL_ERROR,
                    "headers": Lambdab.headers,
                    "body": JSON.stringify({
                        "message": "Something went wrong!!"
                    })
                }
            }
        })
    }
}

Lambdab.UserError = class UserError extends Error {}
Lambdab.headers = {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
}
