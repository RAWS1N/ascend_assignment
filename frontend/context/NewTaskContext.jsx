import { useContext, useState } from "react";
import { createContext } from "react";
import { UseList } from "./ListContext";
import { UserState } from "./UserContext";
import { Server } from "../utils/Server";



const NewTaskContext = createContext()

export const UseNewTask = () => {
    return useContext(NewTaskContext)
}


const NewTaskProvider = ({children}) => {
    const [isOpen,setIsOpen] = useState(false)
    const [listId,setListId] = useState(null)
    const {fetchAgain} = UseList()
    const {user} = UserState()

    const onClose = () => {
        setIsOpen(false)
        setListId(null)
    }

    const onOpen = (id) => {
        setIsOpen(true)
        setListId(id)
    }

     const addTask = async(task) => {
        console.log(listId)
    try{
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
      const {data} = await Server.post(`/task/${listId}`,{name:task},config)
      console.log(data)
      fetchAgain()
    } catch(e){
        console.log(e.message)
    }
  }

    return (
        <NewTaskContext.Provider value={{ onOpen, onClose, isOpen,addTask }}>
            {children}
        </NewTaskContext.Provider>
    )
}


export default NewTaskProvider