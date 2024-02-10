require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.auth = async (req,res,next) => {
    try{
        const token = req.body.token || req.cookies.token;

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            })
        };

        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode)
            req.user = decode;
        }
        catch(error){
            console.log(error);
            return res.status(401).json({
                success: false,
                message:" Token is invalid"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while validating the token",
        })
    }
}