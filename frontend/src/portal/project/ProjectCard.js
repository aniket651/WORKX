import React from 'react'

const ProjectCard = (props) => {
  return (
    <div>
        <div>{props.name}</div>
        <div>{props.aim}</div>
        <div>{props.deadline}</div>
    </div>
  )
}

export default ProjectCard