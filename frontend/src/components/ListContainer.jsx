import React from 'react'
import Task from './Task'
import { useDrop } from 'react-dnd'
import { Server } from '../../utils/Server'
import { UserState } from '../../context/UserContext'
import { UseList } from '../../context/ListContext'




const ListContainer = ({ id: listid, title, Tasks, listData, setListData }) => {
  const { user } = UserState()
 
  const { fetchAgain, refetch } = UseList()


  const [{ isOver }, drop] = useDrop({
    accept: "task",
    drop: (item) => addItemToList(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  })

  const addItemToList = async (item) => {
    try {
    updateListArray(item)
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
    const updatedTask = { ...item.task, listId: listid }
    const { data } = await Server.post(`/task/update/${item.task.id}`, updatedTask, config)
    fetchAgain()
  } catch(e) {
    console.log(e.message)
  }
  }




  const updateListArray = (item) => {
    if(item.task.listId === listid) return 
    const prevListIndex = listData.findIndex(list => list.id === item.task.listId)
    const targetListIndex = listData.findIndex(item => item.id === listid)

    if (prevListIndex === -1 || targetListIndex === -1) {
      console.error('Unable to find list indices');
      return;
  }

    const updatedListData = [...listData]
    updatedListData[prevListIndex].Tasks = updatedListData[prevListIndex].Tasks.filter(task => task.id !== item.task.id)
    updatedListData[targetListIndex].Tasks = [
      ...updatedListData[targetListIndex].Tasks,
      {...item.task,listId:listid}
    ]

    setListData(updatedListData);
  }

  const deleteTaskById = async(task) => {
    const prevListIndex = listData.findIndex(list => list.id === task.listId)
    const prevListData = [...listData]
    prevListData[prevListIndex].Tasks = prevListData[prevListIndex].Tasks.filter(item => item.id !== task.id)
    setListData(prevListData)
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      await Server.delete(`/task/${task.id}`,config)
      refetch()
    } catch(e) {
      console.log(e.message)
    }
  }

  return (
    <div ref={drop} className={`w-[350px] min-w-[350px] min-h-[300px] max-h-[300px] overflow-y-auto border px-4 pt-2 pb-4 rounded-md ${isOver ? "bg-neutral-100" : ""}`}>
      <p className='text-center font-semibold text-lg pb-2'>{title}</p>
      <div className='space-y-3'>
        {Tasks?.map(task => <Task handleDelete={deleteTaskById} key={task.id} task={task} />)}
      </div>
    </div>
  )
}

export default ListContainer