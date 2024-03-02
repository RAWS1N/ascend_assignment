import { useContext, useState } from "react";
import { createContext } from "react";



const LoginContext = createContext()

export const UseLogin = () => {
    return useContext(LoginContext)
}


const LoginProvider = ({children}) => {
    const [isOpen,setIsOpen] = useState(false)

    const onClose = () => {
        setIsOpen(false)
    }

    const onOpen = () => {
        setIsOpen(true)
    }


    return (
        <LoginContext.Provider value={{ onOpen, onClose, isOpen }}>
            {children}
        </LoginContext.Provider>
    )
}


export default LoginProvider