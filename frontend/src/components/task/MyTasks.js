import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import api from '../../api';
import './MyTasks.css'
import TaskCard from './TaskCard';

const MyTasks = (props) => {
  const [compArray,setCompArray] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    if (!props.loggedIn) {
      navigate('/login');
    }
  }, [props.loggedIn, navigate]);
  

  useEffect(()=>{
    console.log("fetching data for TaskList !! ")
    fetchData();
  }, [])


  const fetchData = async()=>{
    try {

      const res = await api.get("/tasks")
      console.log(res.data);
      if(res.status === 200){
          console.log("status:200, setting fetched Task list to compArray");
          setCompArray(res.data);
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  const changeCompArray = (newArray)=>{
    setCompArray(newArray);
  }


  const pendingTasks = compArray.filter((item) => item.status === 'pending');
  const inProgressTasks = compArray.filter((item) => item.status === 'in-progress');
  const completedTasks = compArray.filter((item) => item.status === 'completed');
  
  return (
    <div className='Task-List grid-container'>
      <div className='Pending-List category'>
        <h2>Pending Tasks</h2>
        {pendingTasks.map((item, index) => (
          <TaskCard key={index} taskId={item._id} compArray={compArray} changeCompArray={changeCompArray}/>
        ))}
      </div>
      <div className='Progress-List category'>
        <h2>In Progress Tasks</h2>
        {inProgressTasks.map((item, index) => (
          <TaskCard key={index} taskId={item._id} compArray={compArray} changeCompArray={changeCompArray} />
        ))}
      </div>
      <div className='Completed-List category'>
        <h2>Completed Tasks</h2>
        {completedTasks.map((item, index) => (
          <TaskCard key={index} taskId={item._id} compArray={compArray} changeCompArray={changeCompArray} />
        ))}
      </div>
    </div>
  )
}

export default MyTasks