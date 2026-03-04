  const errorHandler = (err,req,res,next)=>{
    if(err.isOperational){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        })
    }
    console.log("Enexpect ERRROR: " , err)

    res.status(500).json({
        success:false,
        message:"Something went worng, Please Try Again"
    })
}

export default errorHandler;