import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import api from '../../api';
import ProjectCard from './ProjectCard';


const MyProjects = (props) => {
  const [compArray,setCompArray] = useState([]);
  const navigate = useNavigate();

    useEffect(() => {
        if (!props.loggedIn) {
          navigate('/login');
        }
      }, [props.loggedIn, navigate]);

    // useEffect(()=>{
    //     if(localStorage.getItem('loggedIn')){
    //         navigate('/projects');
    //     }

    // }, [])
    useEffect(()=>{
      console.log("fetching data for ProjectList!! ")
      fetchData();
  }, [])


  // let componentList = [];
  // useEffect(() => {
  //   componentList = compArray.map((item, index) => (
  //     <ProjectCard key={index} name={item.name} aim={item.aim} deadline={item.deadline}/>
  //   ));
  // }, [compArray])


  const fetchData = async()=>{
    try {

      const res = await api.get("/projects")
      console.log(res.data);
      if(res.status === 200){
          console.log(res.status);
          setCompArray(res.data);
      }
      
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div>
      {compArray.map((item, index) => (
        <ProjectCard key={index} name={item.name} aim={item.aim} deadline={item.deadline} />
      ))}
    </div>
  )
}

export default MyProjects