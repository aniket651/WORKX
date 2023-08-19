import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api';
import ReactLoading from "react-loading";
import SuperTaskCard from './SuperTaskCard';
import "./ProjectPage.css"


const ProjectPage = (props) => {
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState({});
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("fetching data for the Project!! ")
    fetchProject();
    console.log("fetched data for the Project!! ")
  }, [])


  // let componentList = [];
  // useEffect(() => {
  //   componentList = compArray.map((item, index) => (
  //     <ProjectCard key={index} name={item.name} aim={item.aim} deadline={item.deadline}/>
  //   ));
  // }, [compArray])


  const fetchProject = async () => {
    try {

      const res = await api.get(`/projects/${projectId}`)
      setLoading(false);
      console.log(res.data);
      if (res.status === 200) {
        console.log(res.data);
        setProjectDetails(res.data);
        setTaskList(res.data.tasks);
      }

    } catch (error) {
      console.log(error);
    }
  }

  const handleCreateTask = (e) => {
    navigate(`/createTask/${projectId}`);
  }

  const handleDeleteProject = async (e) => {
    try {

      const response = await api.delete(`/projects/${projectId}`);
      console.log(response.data);
      if (response.status === 200) {
        alert("the Project is deleted !! refresh to see changes")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditProject = (e) => {
    localStorage.setItem('project-name', projectDetails.name);
    localStorage.setItem('project-deadline', projectDetails.deadline.substring(0, 10));
    localStorage.setItem('project-description', projectDetails.description);
    // localStorage.setItem('task-name', props.task.name);

    navigate(`/editProject/${projectId}`);
  }





  return (
    loading === true ? (<ReactLoading type="bars" color="#0000FF"
      height={100} width={50} />) : (

      <div className='project-page'>
        {/* <div>ProjectPage</div> */}
        <div className='project-name-div'><span className='project-name'>{projectDetails.name}</span></div>
        <div className='project-aim-div'>{projectDetails.aim}</div>
        {/* <div>deadline: {projectDetails.deadline}</div> */}
        <div className='button-div'>
          <button className='createTaskButton' onClick={handleCreateTask}>Create New Task</button>
          <button className='EditProjectButton' onClick={handleEditProject}>Edit Project</button>
          <button className='DeleteProjectButton' onClick={handleDeleteProject}>Delete Project</button>
        </div>

        <div className='task-grid'>
          {taskList.map((item, index) => (
            <SuperTaskCard key={index} projectId={projectId} task={item} />
          ))}
        </div>
      </div>
    )
  )
}

export default ProjectPage