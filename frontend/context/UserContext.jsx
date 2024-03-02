import { useContext, useEffect, useState } from "react";
import { createContext } from "react";



const UserContext = createContext()


export const UserState = () => {
    return useContext(UserContext)
}


const UserProvider = ({children}) => {
    const [user,setUser] = useState({})

    useEffect(() => {
        const fetchUserData = async () => {
          const userInfo = await JSON.parse(localStorage.getItem("user"));
          if (!userInfo) {
            Navigator("/");
            return 
          }
          setUser(userInfo);
         
        };
        fetchUserData();
      }, [Navigator])

      return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
      )
}


export default UserProvider