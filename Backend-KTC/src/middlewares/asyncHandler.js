

const asyncHandler = (asynFunction)=>{
    return (req,res,next)=>{
        Promise.resolve(
            asynFunction(req,res,next)
        ).catch((error)=>next(error))
    }
}

export default asyncHandler;