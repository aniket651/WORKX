// src/components/CreateTaskForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './services/api';

const CreateTaskForm = ({ projectId }) => {
  const [name, setName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleCreateTask = async () => {
    try {
      await api.post(`/projects/${projectId}`, {
        name,
        deadline,
        description,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      navigate(`/projects/${projectId}`);
    } catch (error) {
      console.error('Failed to create task:', error.message);
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input type="date" onChange={(e) => setDeadline(e.target.value)} />
      <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
      <button onClick={handleCreateTask}>Create Task</button>
    </div>
  );
};

export default CreateTaskForm;
