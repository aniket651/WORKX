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
   .get(taskController.getTasks)
   .post(projectController.createProject)


router
    .route('/:userId/:taskId')
    .patch(taskController.updateStatus)



router
    .route('/:userId/:projectId')
    .get(projectController.getProject)//gets a Particular Project 
    .post(taskController.createTask)//creates Task of the Project


module.exports = router;