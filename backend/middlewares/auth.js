const jwt = require("jsonwebtoken");

exports.checkAuth = async(req,res,next)=>{
    try {
        // fetch token
        const token = req.headers.authorization;

        if(!token || !token.startsWith("Bearer ")){
            return res.status(403).json({
                success:false,
                message:"Token is missing or malformed",
            })
        }

        const actualToken = token.split(" ")[1];

        const decoded = jwt.verify(actualToken,"sourabh");

        req.user = decoded;
        next();     
    } catch (error) {
      console.log(error);
      return res.status(403).json({
        success:false,
        message:"Token is invalid or expired",
      })
        
    }
}