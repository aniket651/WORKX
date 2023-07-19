import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  let [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <Routes>
        <Route path='/' element={<Navbar />} />
      </Routes>


      <Routes>

        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={loggedIn ? <Dashboard /> : <Redirect to="/login" />} />

        <Route exact path='/:username/profile' />
        <Route exact path='/Dashboard' element={loggedIn ? <Dashboard /> : <Redirect to="/login" />} />//Dashboard will show the links to my projects,my tasks
        <Route exact path='/:username/projects' element={loggedIn ? <MyProjects /> : <Redirect to="/login" />} />
        <Route exact path='/:username/tasks' element={loggedIn ? <MyTasks /> : <Redirect to="/login" />} />
        {/* <Route exact path='/:username/projects/' element={loggedIn ? <Dashboard /> : <Redirect to="/login" />} /> */}

        <Route exact path='/:username/tasks/:taskId' element={loggedIn ? <TaskPage /> : <Redirect to="/login" />} />
        <Route exact path='/:username/projects/:projectId' element={loggedIn ? <ProductPage /> : <Redirect to="/login" />} />

        <Route exact path='/Dashboard' element={loggedIn ? <Dashboard /> : <Redirect to="/login" />} />
        <Route exact path='/' element={loggedIn ? <Redirect to="/Dashboard" /> : <Landing />} />
      </Routes>
    </>
  );
}

export default App;
//route navbar on all elements