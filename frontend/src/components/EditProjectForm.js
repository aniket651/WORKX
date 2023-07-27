// src/components/EditProjectForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './services/api';

const EditProjectForm = ({ projectId }) => {
  const [aim, setAim] = useState('');
  const [deadline, setDeadline] = useState('');
  const navigate = useNavigate();

  const handleEditProject = async () => {
    try {
      await api.patch(`/projects/${projectId}`, {
        aim,
        deadline,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      navigate(`/projects/${projectId}`);
    } catch (error) {
      console.error('Failed to edit project:', error.message);
    }
  };

  return (
    <div>
      <h2>Edit Project</h2>
      <input type="text" placeholder="Aim" onChange={(e) => setAim(e.target.value)} />
      <input type="date" onChange={(e) => setDeadline(e.target.value)} />
      <button onClick={handleEditProject}>Save Changes</button>
    </div>
  );
};

export default EditProjectForm;
