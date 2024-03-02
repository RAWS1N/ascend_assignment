import Task from "../models/Task.model.js";


export const createTask = async(req,res) => {
    const {name,completed} = req.body
    const {listId} = req.params
    try{
        await Task.create({listId,name,completed})
        res.status(201).json({success:true,message:"task has been created"})
    } catch(e){
        res.status(400).json({success:false,message:"task couldn't be created"})
    }
}


export const updateTask = async(req,res) => {
    const {taskId} = req.params
    const updatedTask = req.body
    console.log(taskId)

    try {
        const task = await Task.findByPk(taskId)
        if(!task) {
            return res.status(404).json({success:false,message:"task not found"})
        }

        task.update(updatedTask)
        console.log('task updated successfully')

    } catch(e){
        console.log(e)
        res.status(400).json({success:false,message : e.message})
    }
}


export const deleteTaskById = async(req,res) => {
    const {id} = req.params
    try {
        const task = await Task.findByPk(id)
        if(!task){
            return res.status(404).json({success:false,message:`task with id ${id} not found`})
        }
        await task.destroy()
        return res.status(204).json({success:true,message:"task has been deleted"})

    } catch(e) {
        return res.status(400).json({success:false,message:e.message})
    }
}