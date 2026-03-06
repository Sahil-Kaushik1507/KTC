import jwt from 'jsonwebtoken'

export const authentication = (req,res,next)=>{
        const authHeaders = req.headers.authorization
        // console.log(req.headers.authorization)

        if(!authHeaders){
            return res.status(401).json({
                message:"No token Provided"
            })
        }

        const token = authHeaders.split(" ")[1]
        // console.log(token);
        
        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            req.user=decode
            next();
        } catch (error) {
            
            return res.status(401).json({
                message:"Invalid Token"
            })
        }
}


