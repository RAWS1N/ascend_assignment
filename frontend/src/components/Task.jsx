import React, { useState } from 'react'
import { useDrag } from 'react-dnd'


const Task = ({task,handleDelete}) => {
  const {id,name,completed,listId} = task
  const [isCompleted,setIsCompleted] = useState(completed)
  const [{isDragging},drag] = useDrag({
    type:"task",
    item : {task},
    collect : (monitor) => ({
      isDragging : !!monitor.isDragging()
    })
  })

  const handleTaskChange = (e) => {
    setIsCompleted(e.target.checked)
    if(!e.target.checked) return 
    setTimeout(() => {
      handleDelete(task)
    },1000)
  }

  return (
    <div ref={drag} key={id} className={`flex cursor-grab gap-2 p-2 border select-none rounded-md border-neutral-300 ${isDragging ? 'opacity-25': "opacity-100"}`}>
        <input id={id} type="checkbox" onChange={handleTaskChange}/>
        <label htmlFor={id}>{name}</label>
    </div>
  )
}

export default Task