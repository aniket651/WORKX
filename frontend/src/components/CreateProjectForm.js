// src/components/CreateProjectForm.js
import React, { useState } from 'react';
import api from './services/api';
import { useNavigate } from 'react-router-dom';
const CreateProjectForm = () => {
  const [name, setName] = useState('');
  const [aim, setAim] = useState('');
  const [deadline, setDeadline] = useState('');
  const navigate = useNavigate();

  const handleCreateProject = async () => {
    try {
      await api.post('/projects', {
        name,
        aim,
        deadline,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      navigate('/projects');
    } catch (error) {
      console.error('Failed to create project:', error.message);
    }
  };

  return (
    <div>
      <h2>Create Project</h2>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Aim" onChange={(e) => setAim(e.target.value)} />
      <input type="date" onChange={(e) => setDeadline(e.target.value)} />
      <button onClick={handleCreateProject}>Create Project</button>
    </div>
  );
};

export default CreateProjectForm;
