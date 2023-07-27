import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProjectPage = (props) => {

  const navigate = useNavigate();

    useEffect(() => {
        if (!props.loggedIn) {
          navigate('/login');
        }
      }, [props.loggedIn, navigate]);

  return (
    <div>ProjectPage</div>
  )
}

export default ProjectPage