const router = require('express').Router();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const users = require("../db_models/userModel")
router.post('/signup',async(req,res)=>{
    try {
        const isUser = await users.findOne({email:req.body.email})  
        if (isUser) {
            console.log("user already exists")
            return res.status(400).json("user already exists")
        } else {
        const salt = await bcrypt.genSaltSync(10);
        const password = await bcrypt.hash(req.body.password, salt);
        const user = new users({
            nmae: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: password
        })
        await users.create(user)
        console.log("signup successful")
        res.status(200).json(user)
    }
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
})
router.get('/login',async(req,res)=>{
    try {
        const { email, password } = req.body;
        const isUser = await users.findOne({email:req.body.email})
        if (!isUser) {
            console.log("user not found")
            return res.status(400).json("user not found")
        } else {
            const isPassword = await bcrypt.compare(req.body.password, isUser.password)
            if (isPassword) {
                console.log("login successful")
                res.send("login successful")
            } else {
                console.log("login failed due to invalid password")
                res.send("login failed due to invalid password")
            }
        }
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
})
module.exports =router