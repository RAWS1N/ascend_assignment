import { createContext,useContext,useEffect,useState } from "react";
import { UserState } from "./UserContext";
import { Server } from "../utils/Server";


const ListContext = createContext()


export const UseList = () => {
    return useContext(ListContext)
}



const ListContextProvider = ({children}) => {
    const [listData,setListData] = useState([])
    const [refetch,setRefetch] = useState(false)
    const {user} = UserState()


    const fetchAgain = () => {
        setRefetch(prevState => !prevState)
    }


    const getData = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
          const { data } = await Server.get('/list',config)
          setListData(data.data)
        }catch(e) {
          console.log(e.message)
        }
      }
    
      useEffect(() => {
        getData()
      },[user,refetch])
    


      return (
        <ListContext.Provider value={{fetchAgain,listData,setListData,refetch}}>
                {children}
        </ListContext.Provider>
      )
}


export default ListContextProvider