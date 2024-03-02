import jwt from "jsonwebtoken";
import User from "../models/User.model.js";


export const isAuthanticated = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
        // getting token from header
      token = req.headers.authorization.split(" ")[1];
    //   verifying token 
      const decoded_id = await jwt.verify(token, process.env.JWT_SECRET);
    //   parsing id from token
      const { id } = decoded_id;
    //   finding user via id
      const user = await User.findOne({where:{id}})
    //   setting request user after getting user
      req.user = user;
    //   moving next
      next();
    } catch (e) {
        // error if user is not logged in
        console.log(e)
        return res.status(401).json({success:false,message:"Please Login First"})
    }
  }
  if(!token){
    // sending error if token is not valid
    return res
        .status(401)
        .json({ success: false, message: "invalid token received" });
  }
};