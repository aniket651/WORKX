// src/components/ProjectDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from './services/api';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${projectId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProject(response.data);
      } catch (error) {
        console.error('Failed to fetch project details:', error.message);
      }
    };

    fetchProject();
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Project Details</h2>
      <p>Name: {project.name}</p>
      <p>Aim: {project.aim}</p>
      <p>Deadline: {project.deadline}</p>
      {/* Display more project details as needed */}
    </div>
  );
};

export default ProjectDetails;
