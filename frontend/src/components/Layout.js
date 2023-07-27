import React from 'react';
import Navbar from './navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = (props) => {
  return (
    <div>
      <Navbar fxn={props.fxn} loggedIn={props.loggedIn}/>
      <Outlet />
    </div>
  );
};

export default Layout;