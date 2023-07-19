const mongoose = require('mongoose');
const express = require('express');

const User = require('../model/UserDB');
const Project = require('../model/ProjectDB');
const Task = require('../model/TaskDB');

exports.createTask = async(req,res)=>{
    try {
        //
        console.log("inside createTask");
        // console.log(req.params.userId);
        const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);
        const connect = await mongoose.connect(DB);
        const projects = await User.findById(req.params.projectId);
        // if(!projects){
        //     connect.disconnect();
        //     res.status(400).send('no such project found !!')
        // }

        console.log(req.params.userId);
        let assigned = req.body.assigned_to;
        console.log(assigned);
        if(assigned===undefined){
            assigned = req.params.userId;
        }
        console.log(assigned);
        const newTask = await Task.create({
            name: req.body.name,
            description: req.body.description,
            status: "pending",
            deadline: req.body.deadline,
            assigned_to:  assigned,
            project: req.params.projectId
        })
        connect.disconnect();
        // console.log(projects)
        res.status(201).send(newTask);

    } catch (error) {
        res.status(500).send(error)
    }
}

exports.getTasks = async(req,res)=>{
    try {
        console.log("inside getTask");
        // console.log(req.params.userId);
        const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);
        const connect = await mongoose.connect(DB);
        const tasks = await User.findById(req.params.userId).populate('tasks');
        connect.disconnect();

        res.status(200).send(tasks.tasks);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.changeTask = async(req,res)=>{
    try {
        console.log("inside changeTask");
        // console.log(req.params.userId);
        const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);
        const connect = await mongoose.connect(DB);

        const project = await Project.findById(req.params.projectId);
        // if(!project){
        //     connect.disconnect();
        //     res.status(400).send('parent project not found !!')
        // }
        if(project.owner != req.params.userId){
            connect.disconnect();
            res.status(403).send('Access Not Granted to this Project !!!')
        }
        let newName = req.body.name;
        let newDescription = req.body.description;
        let newDeadline = req.body.deadline;
        let newAssigned_to = req.body.assigned_to;
        
        const newTask = await Task.findByIdAndUpdate(req.params.taskId,{
            name: newName,
            description: newDescription,
            deadline: newDeadline,
            assigned_to: newAssigned_to
        },{new:true})


        connect.disconnect();
        res.status(200).send(newTask);
    } catch (error) {
        res.status(500).send(error);
    }
}


exports.updateStatus = async(req,res)=>{
    try {
        console.log("inside updateStatus");
        // console.log(req.params.userId);
        const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);
        const connect = await mongoose.connect(DB);
        const task = await Task.findById(req.params.taskId);
        // if(!task){
        //     connect.disconnect();
        //     res.status(400).send('Task not found !!')
        // }
        if(task.assigned_to != req.params.userId){
            connect.disconnect();
            res.status(403).send("This Task is not assigned to you !!");
        }

        const newTask = await Task.findByIdAndUpdate(req.params.taskId,{
            status: req.body.status
        },{new:true})


        connect.disconnect();
        res.status(200).send(newTask);
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.deleteTask = async(req,res)=>{
    try {
        console.log("inside deleteTask");
        // console.log(req.params.userId);
        const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);
        const connect = await mongoose.connect(DB);
        const project = await Project.findById(req.params.projectId).populate('tasks');
        // if(!project){
        //     connect.disconnect();
        //     res.status(400).send('Project not found !!')
        // }
        if(project.owner != req.params.userId){
            connect.disconnect();
            res.status(403).send("you dont have access to this whole Project !!");
        }

        const deletedTask = await Task.deleteOne({_id: req.params.taskId})
        connect.disconnect();
        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(500).send(error)
    }
}