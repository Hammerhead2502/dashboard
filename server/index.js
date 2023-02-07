//Require modules and middleware
const express = require("express");
const app = express();
require('dotenv').config()
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors")
const session = require("express-session")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { sign } = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const userCookie = require("./userCookie")
const User = require("./UserSchema")

//Configurations
app.use(bodyParser.urlencoded({extended: true}))

app.use(cookieParser())

app.use(express.json())

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200
}))

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}))

//Connect to database
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/dashboardDB")

//Create routes and handle requests
app.post("/register", (req, res) => {
    const username = req.body.registerEmail
    const password = req.body.registerPassword
    //Check if user already exist or not
    User.findOne({username: username}, (err, foundUser) => {
        if(err) {
            throw err
        }
        else if(foundUser){
            res.status(302).send("User already exists")
        }
        else{
            //Encrypt the password
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if(err){
                    throw err
                }
                else{
                    //Create a new user
                    const user= new User({
                        username: username,
                        password: hash
                    })
                    //Save the user in database
                    user.save((err) => {
                        if(err){
                            throw err
                        }
                        else{
                            res.status(200).send("User saved successfully")
                        }
                    })
                }
            });
        }
    })
})

app.post("/login", (req,res) => {
    const username = req.body.registerEmail
    const password = req.body.registerPassword
    //Check if a user exist
    User.findOne({username: username}, (err, userFound) => {
        if(err){
            throw(err)
        }
        else if(!userFound){
            res.status(302).send("User not found")
        }
        else{
            //Compare the password with the encrypted password from database
            bcrypt.compare(password, userFound.password, (err, result) => {
                if(!result) {
                    res.status(404).send("Incorrect password")
                }
                else{   
                    //Create a jwt token that expires after a day
                        let token = sign({id: userFound._id}, process.env.SESSION_KEY, { expiresIn: '1d' }, (err, userToken) => {
                        if(err){
                            throw err
                        }
                        else{
                            //Assign the value inside a cookie
                            res.status(200).cookie("token", userToken, {
                                httpOnly: true
                            }).send("User loggedin")
                        }
                    })
                }
            })
        }
    }
  )
})

app.get("/", userCookie ,(req,res) => {
    //Check if user is already signed in
    const token= req.token.tokenExist
                User.findOne({_id: token.id}, (err, userData) => {
                    if(err){
                        console.log(err)
                    }
                    else{
                        res.status(200).send("Authorized")
                    }   
                })
})

app.get("/dashboard", userCookie, (req,res) => {
    const token= req.token.tokenExist
                User.findOne({_id: token.id}, (err, userData) => {
                    if(err){
                        console.log(err)
                    }
                    else{
                        //Send userdata back if user is signed in correctly
                        res.status(200).send(userData)
                    }   
                })
})

app.post("/addNote", userCookie, (req,res) => {
    const Note = {
        title: req.body.title,
        message: req.body.message
    }
    const token= req.token.tokenExist
    //Push the recieved note in the notes array
                User.updateOne({_id: token.id}, { $push: { "notes": Note }}, (err, result) => {
                    if(err){
                        res.send(err)
                    } 
                    else{
                        res.status(200).send("Note added")
                    }
                })
})

app.get("/getNotes", userCookie, (req,res) => {
    const token= req.token.tokenExist
    //Get notes array of the particular user and send it back as a response
                User.findOne({_id: token.id}, (err, userFound) =>  {
                    if(err){
                        res.send(err)
                    }
                    else{
                        res.send(userFound.notes)
                    }
                })
})

app.post("/addContact", userCookie, (req,res) => {
    const Contact = {
        name: req.body.name,
        number: req.body.number
    }
        //Push the recieved contact in the contacts array
    const token= req.token.tokenExist
                User.updateOne({_id: token.id}, { $push: { "contacts": Contact }}, (err, result) => {
                    if(err){
                        res.send(err)
                    } 
                    else{
                        res.status(200).send("Contact added")
                    }
                })
})

app.get("/getContacts", userCookie, (req,res) => {
     //Get contacts array of the particular user and send it back as a response
    const token= req.token.tokenExist
                User.findOne({_id: token.id}, (err, userFound) =>  {
                    if(err){
                        res.send(err)
                    }
                    else{
                        res.send(userFound.contacts)
                    }
                })
})

app.get("/logout", (req,res) => {
    //Make the value of token cookie as an empty string to logout the user
    res.cookie("token", "").status(200).send("User logged out")
})

app.listen(3001, () => console.log("Server listening on port 3001"))
