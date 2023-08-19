import React from 'react'
import "./ProjectCard.css"
import { useNavigate } from 'react-router-dom';
const ProjectCard = (props) => {
  const navigate = useNavigate();

  const handleVisitProject = ()=>{
    const url = `/projects/${props.projectId}`;
    navigate(url);
  }


  return (
    <div className='project-card'>
        <div className='project-name'>{props.name}</div>
        <div className='project-aim'>{props.aim}</div>
        <div className='project-deadline'>{props.deadline}</div>
        <button onClick={handleVisitProject}>Visit Project Page</button>
    </div>
  )
}

export default ProjectCard