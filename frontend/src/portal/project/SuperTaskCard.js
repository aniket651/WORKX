import React from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import "./SuperTaskCard.css"


const SuperTaskCard = (props) => {
    const navigate = useNavigate();

    const handleEdit = (e) =>{
        localStorage.setItem('task-name', props.task.name);
        localStorage.setItem('task-deadline', props.task.deadline.substring(0,10));
        localStorage.setItem('task-description', props.task.description);
        localStorage.setItem('task-assigned_to', props.task.assigned_to);
        // localStorage.setItem('task-name', props.task.name);

        navigate(`/EditTask/${props.projectId}/${props.task._id}`);
    }

    const handleDelete = async(e) =>{
        try {

            const response = await api.delete(`/projects/${props.projectId}/${props.task._id}`);
            console.log(response.data);
            if(response.status===200){
                alert("the task is deleted !! refresh to see changes")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='SuperCard'>
                <div className='task-name'>{props.task.name}</div>
                <div className='task-description'><span>Description: </span>{props.task.description}</div>
                <div className='task-status'><span>Status: </span>{props.task.status}</div>
                <div className='task-assigned_to'><span>Assigned to user: </span>{props.task.assigned_to}</div>{/*rather display the username*/}
                <div className='task-deadline'><span>Deadline: </span>{props.task.deadline}</div>
                <button className='edit-button' onClick={handleEdit}>Edit</button>
                <button className='delete-button' onClick={handleDelete}>Delete</button>

            </div>
        </>
    )
}

export default SuperTaskCard