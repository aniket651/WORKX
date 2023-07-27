// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from "react-router-dom"

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
//=================================================================================================================

//=================================================================================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './auth/login/Login';
import Register from './auth/register/Register';
import Auth from './auth/Auth';
import App from './App';
import ProtectedRoute from './util/ProtectedRoute';
import Home from './portal/home/Home';
import MyProjects from './portal/project/MyProjects';
import MyTasks from './portal/task/MyTasks';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={'/'}>
      <Routes>
        <Route path='/auth' element={<Auth />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route path="/" element={<App />}>
          <Route path='' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='projects' element={
            <ProtectedRoute>
              <MyProjects />
            </ProtectedRoute>
          } />
          <Route path='tasks' element={
            <ProtectedRoute>
              <MyTasks />
            </ProtectedRoute>
          } />
          
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);