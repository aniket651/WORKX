// src/components/ProjectList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './services/api';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProjects(response.data);
        console.log("projects");
      } catch (error) {
        console.error('Failed to fetch projects:', error.message);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (projectId) => {
    console.log("hehe");
    console.log(projects);
    navigate(`/projects/${projectId}`);
  };

  return (
    <div>
      <h2>Projects</h2>
      {projects.map((project) => {
        console.log(project);
        return (
            
            <div key={project.id} onClick={() => handleProjectClick(project.id)}>
            <p>{project.name}</p>
            </div>
        )
        })}
    </div>
  );
};

export default ProjectList;
