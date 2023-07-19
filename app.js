const express = require('express');
const app = express();

const indexRoutes = require("./routes/indexRoutes");
const projectRoutes = require("./routes/projectRoutes.js");
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(express.json());
app.use('/',indexRoutes);
app.use('/auth',authRoutes);
app.use('/projects',projectRoutes);
app.use('/tasks',taskRoutes);
// app.use('')
module.exports = app;