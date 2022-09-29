import React, { useState } from 'react'
import { GrHostMaintenance } from 'react-icons/gr'
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import Header from './../../components/Header';

function MaintainenceTask() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')

  // add tasks
  const handleSubmit = (e) => {
    e.preventDefault()
    const addTask = {
      id: Math.floor(Math.random() * 1000),
      text: input,
      completed: false
    }
    setTasks([...tasks, addTask])
    setInput('')
  }

  // delete tasks
  const deleteTask = (id) => {
    let filteredTasks = [...tasks].filter((tasks) => tasks.id !== id)
    setTasks(filteredTasks)
    console.log('task deleted')
  }

  // toggle completed task
  const toggleComplete = (id) => {
    setTasks(
      tasks.map(task => (
        task.id === id ? { ...task, completed: !task.completed } : task
      ))
    )
  }

  const date = new Date()
  // console.log(date)
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
      <div ><GrHostMaintenance />
      {days[date.getDay()]}  {date.getDate()}  {months[date.getMonth()]}  {date.getFullYear()}
        <Header title="Service reminders"/> 

         <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center">
          <AiOutlinePlus className='icon' />
            <input className=" bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-Black" 
            
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder='Enter a task'
              type="text" />
          </div><br></br><br></br>
        </form>

        <div className="">
          {tasks.map(task => (
            <div className={`task-row ${task.completed ? 'completed' : ''}`} key={task.id} onDoubleClick={() => toggleComplete(task.id)} >
            <AiOutlineClose onClick={() => deleteTask(task.id)} className='icon' />  {task.text}  
            </div>
          ))}
        </div><br></br><br></br>

          <p className='length'>{(tasks < 1) ? 'You have no tasks' : `Tasks: ${tasks.length}`}</p>
      </div>
    </div>
  );
}

export default MaintainenceTask;