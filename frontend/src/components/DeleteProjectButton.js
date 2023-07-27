// src/components/DeleteProjectButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from './services/api';

const DeleteProjectButton = ({ projectId }) => {
  const navigate = useNavigate();

  const handleDeleteProject = async () => {
    try {
      await api.delete(`/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      navigate('/projects');
    } catch (error) {
      console.error('Failed to delete project:', error.message);
    }
  };

  return (
    <button onClick={handleDeleteProject}>Delete Project</button>
  );
};

export default DeleteProjectButton;
