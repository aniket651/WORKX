// src/components/TaskDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from './services/api';

const TaskDetails = () => {
  const { projectId, taskId } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/projects/${projectId}/${taskId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setTask(response.data);
      } catch (error) {
        console.error('Failed to fetch task details:', error.message);
      }
    };

    fetchTask();
  }, [projectId, taskId]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Task Details</h2>
      <p>Name: {task.name}</p>
      <p>Deadline: {task.deadline}</p>
      <p>Description: {task.description}</p>
      {/* Display more task details as needed */}
    </div>
  );
};

export default TaskDetails;
