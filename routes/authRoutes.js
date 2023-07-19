const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config({path : '../config.env'});
// dotenv.config({path: '../config.env'});

const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../model/UserDB');
// const tourController = require('../controllers/tourController');

const router = express.Router();

router
   .route('/register')
   .post(async(req,res)=>{
        try {
            // const salt = bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            console.log(process.env);
            const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);
            const connect = await mongoose.connect(DB,{
                // useNewUrlParser: true,
                // useCreateIndex: true,
                // useFindAndModify: false
            });

            
            // const newUser = new User()


            const newUser = await User.create({
                username: req.body.username,
                password: hashedPassword
            })

            connect.disconnect();
            res.status(201).send(newUser);

        } catch (error) {
            console.log(error);
            res.status(500).send();
        }
   })

router
   .route('/login')
   .post(async(req,res)=>{
        try {
            const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);
            const connect = await mongoose.connect(DB,{
                // useNewUrlParser: true,
                // useCreateIndex: true,
                // useFindAndModify: false
            });

            const user = await User.findOne().where('username').equals(req.body.username)

            connect.disconnect();
            if(user == null){
                res.status(400).send('user not found');
            }
            else{
                console.log(user)
                if(await bcrypt.compare(req.body.password,user.password)){
                    res.status(200).send(user)
                }
                else res.status(401).send('incorrect password !')
            }

        } catch (error) {
            console.log(error);
            res.status(500).send();
        }
   })

module.exports = router;