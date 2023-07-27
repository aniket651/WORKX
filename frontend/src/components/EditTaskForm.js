// src/components/EditTaskForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './services/api';

const EditTaskForm = () => {
  const { projectId, taskId } = useParams();
  const [name, setName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/projects/${projectId}/${taskId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const taskData = response.data;
        setName(taskData.name);
        setDeadline(taskData.deadline);
        setDescription(taskData.description);
      } catch (error) {
        console.error('Failed to fetch task details:', error.message);
      }
    };

    fetchTask();
  }, [projectId, taskId]);

  const handleEditTask = async () => {
    try {
      await api.put(`/projects/${projectId}/${taskId}`, {
        name,
        deadline,
        description,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      navigate(`/projects/${projectId}`);
    } catch (error) {
      console.error('Failed to edit task:', error.message);
    }
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <button onClick={handleEditTask}>Save Changes</button>
    </div>
  );
};

export default EditTaskForm;
