import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Landing = (props) => {

  const navigate = useNavigate();

    useEffect(() => {
        if (props.loggedIn) {
          navigate('/Dashboard');
            // navigate(-1);
        }
      }, [props.loggedIn, navigate]);

  return (
    <div>Landing</div>
  )
}

export default Landing