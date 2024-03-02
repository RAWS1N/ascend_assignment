import { useContext, useState } from "react";
import { createContext } from "react";



const NewListContext = createContext()

export const UseNewList = () => {
    return useContext(NewListContext)
}


const NewListProvider = ({children}) => {
    const [isOpen,setIsOpen] = useState(false)

    const onClose = () => {
        setIsOpen(false)
    }

    const onOpen = () => {
        setIsOpen(true)
    }

    return (
        <NewListContext.Provider value={{ onOpen, onClose, isOpen }}>
            {children}
        </NewListContext.Provider>
    )
}


export default NewListProvider