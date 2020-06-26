import React, { createContext,useState,useEffect } from 'react'
import {v4 as uuid} from 'uuid'

export const TaskListContext = createContext()

const TaskListContextProvider=(props)=>{
    const initalState = JSON.parse(localStorage.getItem('tasks')) || []
    const [tasks, setTasks] = useState(initalState);

    const [editItem,setEditItem] = useState(null)

    useEffect(() => {
      localStorage.setItem('tasks',JSON.stringify(tasks))
    }, [tasks])

    const addTask = (title)=>{
        setTasks([...tasks,{title,id:uuid()}])
    }

    const removeTask = id =>{
       setTasks(tasks.filter(task=> task.id !== id)) 
    }

    const clearTasks = ()=>{
        setTasks([])
    }
    
    const findItem = id =>{
        const item = tasks.find(task => task.id === id)
        setEditItem(item)
    }

    const editTask = (title,id) =>{
        const newTasks = tasks.map(task => 
            (task.id === id ? {title,id} :  task))
        setTasks(newTasks)
        setEditItem(null)
    }

return (
    
    <TaskListContext.Provider value = {{
        tasks,
        addTask,
        removeTask,
        clearTasks,
        findItem,
        editTask,
        editItem

    }}>
        {props.children}
    </TaskListContext.Provider>
)
}
export default TaskListContextProvider
 
