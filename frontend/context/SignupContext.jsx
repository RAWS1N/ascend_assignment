import { useContext, useState } from "react";
import { createContext } from "react";



const SignupContext = createContext()

export const UseSignup = () => {
    return useContext(SignupContext)
}


const SignupProvider = ({children}) => {
    const [isOpen,setIsOpen] = useState(false)

    const onClose = () => {
        setIsOpen(false)
    }

    const onOpen = () => {
        setIsOpen(true)
    }


    return (
        <SignupContext.Provider value={{ onOpen, onClose, isOpen }}>
            {children}
        </SignupContext.Provider>
    )
}


export default SignupProvider