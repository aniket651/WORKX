// src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './services/api';

const TaskList = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get(`/projects/${projectId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setTasks(response.data.tasks);
      } catch (error) {
        console.error('Failed to fetch tasks:', error.message);
      }
    };

    fetchTasks();
  }, [projectId]);

  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${projectId}/${taskId}`);
  };

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.map((task) => (
        <div key={task.id} onClick={() => handleTaskClick(task.id)}>
          <p>{task.name}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
