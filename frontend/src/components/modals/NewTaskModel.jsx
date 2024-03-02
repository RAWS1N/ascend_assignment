import { useState } from "react";
import Modal from "./Modal";
import { Server } from '../../../utils/Server'
import { UserState } from "../../../context/UserContext";
import { UseList } from "../../../context/ListContext";
import { UseNewTask } from "../../../context/NewTaskContext";


const NewTaskModal = () => {
    const {onClose,addTask,isOpen} = UseNewTask()
    const {fetchAgain} = UseList()
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("")

    const handleChange = (e) => {
        setTitle(e.target.value)
    }







    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            await addTask(title)
            setIsLoading(false)
            setTitle("")
            setTimeout(() => {
                onClose()
            },500)
        } catch(e){
            console.log(e)
            setIsLoading(false)
        }
        
    }

    const bodyContent = (
        <div className="">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" name="title" value={title} onChange={handleChange} placeholder="Enter title here..." required />
                <button disabled={isLoading} className="bg-zinc-900 text-white py-1 px-8 rounded-md mx-auto">Create</button>
            </form>
        </div>
    )


    return (
        <Modal
            disabled={isLoading}
            isOpen={isOpen}
            title="Create Task List"
            actionLabel=""
            onClose={onClose}
            onSubmit={() => { }}
            body={bodyContent}
        />
    );
}

export default NewTaskModal;