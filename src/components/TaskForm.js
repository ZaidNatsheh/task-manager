import React, { useState, useContext, useEffect } from 'react'
import { TaskListContext } from '../context/TaskListContext'


const TaskForm = () => {
const {addTask,clearTasks,editTask,editItem,tasks} = useContext(TaskListContext)

const [title,setTitle] = useState('')

const handleChange = e =>{
        setTitle(e.target.value)
    }

const handleSubmit = e =>{
        e.preventDefault()
        if (!editItem){
        addTask(title)
        setTitle('')
        } else
        editTask(title,editItem.id)
    }

  useEffect(() => {
      if (editItem){
          setTitle(editItem.title)
      }else
      setTitle('')
  }, [editItem])

    return (
       <form className="form" onSubmit={handleSubmit}>
           <input type="text"
           className="task-input"
           placeholder="Add Task.."
           required
           onChange={handleChange}
           value={title}
           ></input>
           <div className="buttons">
               <button type="submit"
               className="btn add-task-btn">
                   {editItem ? 'Edit Task' : 'Add Task'}
               </button>
               
                <button disabled={tasks.length ? false : true} className = "clear-btn btn" onClick={()=>clearTasks()}
               >Clear  </button>

           </div>
       </form>
    )
}

export default TaskForm
