import React from 'react'
import "./ProjectCard.css"
const ProjectCard = (props) => {
  return (
    <div className='project-card'>
        <div className='project-name'>{props.name}</div>
        <div className='project-aim'>{props.aim}</div>
        <div className='project-deadline'>{props.deadline}</div>
    </div>
  )
}

export default ProjectCard