import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookie.jwt
        if(!token){
            return res.status(401).json({erro : "Unauthorized - No Token Provided"})
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        
        if(!decode){
            return res.status(401).json({error : " Unauthorized - Invalid Token"})
        }

        const user = await User.findById({_id: decode._id});

        if(!user) return res.status(404).json({error : "User not found"})

        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protected middleware", error); 
        res.status(500).json({erroe:"Internal server error"})
    }
}