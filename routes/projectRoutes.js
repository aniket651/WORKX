const mongoose = require('mongoose');
const express = require('express');
// const tourController = require('../controllers/tourController');
const projectController = require('../controllers/projectController');
const taskController = require('../controllers/taskController');

const User = require('../model/UserDB');
const Project = require('../model/ProjectDB');
const Task = require('../model/TaskDB');

const router = express.Router();

router
   .route('/:userId')
   .get(projectController.getUserProjects)//get all the projects owned by user
   .post(projectController.createProject)//create a new project of the user



router
    .route('/:userId/:projectId')
    .get(projectController.getProject)//gets a Particular Project 
    .post(taskController.createTask)//creates Task of the Project
    .patch(projectController.changeProject)//changes only aim or deadline of the project*
    .delete(projectController.deleteProject)//deletes the Project along with all its tasks*

router
    .route('/:userId/:projectId/:taskId')
    .put(taskController.changeTask)//make changes to a particular task of a particular project
    .delete(taskController.deleteTask)//delete a particular task of a particular Project*
module.exports = router;