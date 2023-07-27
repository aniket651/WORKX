// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import LoginForm from './components/LoginForm';
// import ProjectList from './components/ProjectList';
// import ProjectDetails from './components/ProjectDetails';
// import TaskDetails from './components/TaskDetails';
// import CreateTaskForm from './components/CreateTaskForm';
// import EditProjectForm from './components/EditProjectForm';
// import TaskList from './components/TaskList';
// import EditTaskForm from './components/EditTaskForm';
// import CreateProjectForm from './components/CreateProjectForm';
// import DeleteProjectButton from './components/DeleteProjectButton';
// import useToken from './hooks/useToken';
// import PrivateRoute from './components/PrivateRoute';
// import Navbar from './components/navbar/Navbar';

// const App = () => {

//   const { token, tokenValid, setToken } = useToken();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setToken(null);
//   };
  

//   return (
//     // <Router>
//     <div>
//       <Routes>
//         {/* <nav>
//           {token ? (
//             <Route path="/projects">Projects</Route>
//           ) : (
//             <Route path="/login">Login</Route>
//           )}
//         </nav> */}
//         <Route exact path="/" element={<Navbar/>}/>
//         <Route path="/login" element={<LoginForm setToken={setToken} />} />
//           <PrivateRoute
//             path="/projects"
//             element={<ProjectList />}
//             tokenValid={tokenValid}
//           />
//           <PrivateRoute
//             path="/projects/new"
//             element={<CreateProjectForm />}
//             tokenValid={tokenValid}
//           />
//           <PrivateRoute
//             path="/projects/:projectId"
//             element={<ProjectDetails />}
//             tokenValid={tokenValid}
//           />
//           <PrivateRoute
//             path="/projects/:projectId/edit"
//             element={<EditProjectForm />}
//             tokenValid={tokenValid}
//           />
//           <PrivateRoute
//             path="/projects/:projectId/tasks"
//             element={<TaskList />}
//             tokenValid={tokenValid}
//           />
//           <PrivateRoute
//             path="/projects/:projectId/tasks/new"
//             element={<CreateTaskForm />}
//             tokenValid={tokenValid}
//           />
//           <PrivateRoute
//             path="/projects/:projectId/tasks/:taskId"
//             element={<TaskDetails />}
//             tokenValid={tokenValid}
//           />
//           <PrivateRoute
//             path="/projects/:projectId/tasks/:taskId/edit"
//             element={<EditTaskForm />}
//             tokenValid={tokenValid}
//           />
//           <PrivateRoute
//             path="/projects/:projectId/delete"
//             element={<DeleteProjectButton />}
//             tokenValid={tokenValid}
//           />
//       </Routes>
//     </div>
//     // </Router>
//   );
// };

// export default App;




//===========================================================================================================
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PortalFooter from "./portal/footer/PortalFooter";
import PortalNavbar from "./portal/navbar/PortalNavbar";
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = localStorage.getItem('user-token');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
        }
        setIsLoggedIn(true);
    }
    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);
 
    return (
        <React.Fragment>
            {isLoggedIn && <PortalNavbar />}
            <Outlet />
            {isLoggedIn && <PortalFooter />}
        </React.Fragment>
    );
}
export default App;