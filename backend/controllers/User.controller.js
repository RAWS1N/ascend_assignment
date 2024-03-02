import List from "../models/List.model.js";
import User from "../models/User.model.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from 'bcrypt'


// export const createUser = async(req,res) => {
//     const {name,email,password} = req.body
//     const user = await User.create({username:name,email,password})
//     const list = await List.create({userId:user.id,title:"My First List"})
//     res.status(201).json({success:true,message: "user has been created successfully"})
// }


export const getUsers = async(req,res) => {
    const users = await User.findAll()
    res.status(200).json({success:true,data:users})
}



export const CreateUser = async (req, res, next) => {
    const { username, email, password} = req.body;
    const user = await User.findOne({ where: { email } });
    try {
        if (user) {
            // sending error if user already exist
            return res.status(409).json({
                success: false,
                message: "user already exist",
            });
        } else {
            // making password hashed to protect
            const hashedPassword = await bcrypt.hash(password, 10);
            // creating new user
            const newUser = await User.create({
                username,
                email,
                password: hashedPassword,
            });
            // sending user as response
            res.status(201).json({
                id: newUser.id,
                name: newUser.username,
                email: newUser.email,
                // generating token for auth
                token: generateToken(newUser.id)
            })
        }
    } catch (e) {
        // sending error
        res.status(400).json({success:false,message:e.message})
    }
};


export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    
    try {
        // finding user with email
        const user = await User.findOne({ where: { email } });
    //   throw error if user not exist
      if (!user) return res.status(404).json({success:false,message : "user not found"})
    //   comparing password with stored password in db
      const isMatch = await bcrypt.compare(password, user.password);
    //   throwing error on wrong password
      if (!isMatch) return res.status(400).json({success:false,message:"invalid credentials"})
    //   sending user as response
      res.status(200).json({
        id : user.id,
        name : user.username,
        email : user.email,
        token : generateToken(user.id)
    })
    } catch (err) {
        // handling error
        console.log(err)
      res.status(400).json({success:false,message:err.message})
    }
  };