import List from "../models/List.model.js";
import User from "../models/User.model.js";
import Task from "../models/Task.model.js";


export const createList = async(req,res) => {
   const {title} = req.body
   try{
    await List.create({userId:req.user.id,title})
    res.status(201).json({success:true,message:"list has been created"})
   } catch(e){
    console.log(e)
   }
}



export const getListAndTasks = async(req,res) => {
   try{
      const lists = await List.findAll({
         where: { userId:req.user.id},
         // include: [{ model: User, attributes: ['id', 'username', 'email'] }] // Include the User model with selected attributes
         include : Task
     });
      res.status(200).json({success:true,data:lists})
   } catch(e){
      console.log(e)
      res.status(400).json({success:false,message:e.message})
   }
}

