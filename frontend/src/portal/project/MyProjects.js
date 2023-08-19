import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ReactLoading from "react-loading";

import api from '../../api';
import ProjectCard from './ProjectCard';
import "./MyProjects.css"


const MyProjects = (props) => {
  const [compArray, setCompArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("fetching data for ProjectList!! ")
    fetchData();
    console.log("fetched data for ProjectList!! ")
  }, [])


  // let componentList = [];
  // useEffect(() => {
  //   componentList = compArray.map((item, index) => (
  //     <ProjectCard key={index} name={item.name} aim={item.aim} deadline={item.deadline}/>
  //   ));
  // }, [compArray])


  const fetchData = async () => {
    try {

      const res = await api.get("/projects")
      setLoading(false);
      console.log(res.data);
      if (res.status === 200) {
        console.log(res.status);
        setCompArray(res.data);
      }

    } catch (error) {
      console.log(error);
    }
  }

  const handleCreateProject = ()=>{
    navigate("/createProject");
  }



  return (
    <div className='myprojects'>
      <div className='project-bar'>
        <h1>My Projects</h1>
        <button onClick={handleCreateProject}>Create Project</button> 
      </div>
      {
        loading===false ? (
          <div className='project-grid container'>
            {compArray.map((item, index) => (
              <ProjectCard className='ProjectCard' key={index} projectId={item._id} name={item.name} aim={item.aim} deadline={item.deadline} />
            ))}
          </div>
        ) : (<ReactLoading type="bars" color="#0000FF"
        height={100} width={50} />)
      }
    </div>
  )
}

export default MyProjects