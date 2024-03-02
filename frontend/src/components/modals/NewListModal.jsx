import { useState } from "react";
import Modal from "./Modal";
import { Server } from '../../../utils/Server'
import { UseNewList } from "../../../context/NewListContext";
import { UserState } from "../../../context/UserContext";
import { UseList } from "../../../context/ListContext";


const NewListModal = () => {
    const newListModal = UseNewList()
    const { user } = UserState()
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
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await Server.post('/list', { title }, config)
            console.log(data)
            fetchAgain()
            setTitle('')
            setIsLoading(false)

        }
        catch (e) {
            setIsLoading(false)
            console.log(e)
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
            isOpen={newListModal.isOpen}
            title="Create Task List"
            actionLabel=""
            onClose={newListModal.onClose}
            onSubmit={() => { }}
            body={bodyContent}
        />
    );
}

export default NewListModal;