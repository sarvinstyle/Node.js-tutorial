const AppError = require("../utilities/app_error")

const errorHandler = (error , req,res,next)=>{
    console.log(error)
    if(error.name ==='ValidationError')
    return res.status(500).send("validation is failed")

    if(error instanceof AppError )
     return res.status(error.statusCode).send({errorCode : error.errorCode , message : error.message})

    res.status(400).send("some thing failed");
}
module.exports=errorHandler