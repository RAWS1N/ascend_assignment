import { useEffect, useState } from "react"
import { Server } from "../utils/Server"
import Header from "./components/Header"
import ListContainer from "./components/ListContainer"
import LoginModal from "./components/modals/LoginModal"
import SignupModal from "./components/modals/SignUpModal"
import { UserState } from "../context/UserContext"
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { UseList } from "../context/ListContext"
import { CiSquarePlus } from "react-icons/ci";
import NewListModal from "./components/modals/NewListModal"
import { UseNewList } from "../context/NewListContext"


function App() {
  const { user } = UserState()
  const newListModal = UseNewList()
  // const [listData,setListData] = useState([])
  const { listData, setListData, fetchAgain } = UseList()


  // const getData = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`
  //       }
  //     }
  //     const { data } = await Server.get('/list',config)
  //     setListData(data.data)
  //   }catch(e) {
  //     console.log(e.message)
  //   }
  // }

  // useEffect(() => {
  //   getData()
  // },[user,refetch])

  return (
    <>
      <Header />
      <LoginModal />
      <SignupModal />
      <NewListModal/>
      <DndProvider backend={HTML5Backend}>
        <div className="flex gap-4 h-[90dvh] px-8 py-6  items-baseline overflow-x-scroll">
          {listData.map(item => <ListContainer key={item.id} listData={listData} setListData={setListData}  {...item} />)}
          
          <div className={`border  px-4 pt-2 pb-4 rounded-md w-[350px] min-w-[350px] h-32`}>
            <p className='text-center font-semibold text-lg pb-2'>Create New List</p>
            <CiSquarePlus onClick={newListModal.onOpen} className="text-center mx-auto" size={50}/>
          </div>
        </div>
      </DndProvider>
    </>
  )
}

export default App
