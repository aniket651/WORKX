import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = (props) => {
  const navigate = useNavigate();

    useEffect(() => {
        if (!props.loggedIn) {
          navigate('/login');
        }
      }, [props.loggedIn, navigate]);

      // if(!props.loggedIn){
      //   navigate('/login');
      // }
      useEffect(()=>{
        if(localStorage.getItem('loggedIn')){
            navigate('/Dashboard');
        }

    }, [])

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard