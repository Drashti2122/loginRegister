const express = require('express')
const jwt = require("jsonwebtoken")
const router = express.Router();
const User = require('../models/user')

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const db = "mongodb+srv://NasaAPI:drashti@nasaapi.8lexktk.mongodb.net/authAngular?retryWrites=true&w=majority";
mongoose.connect(db, {
    useNewUrlParser: true,
}).then(() => {
    console.log("DB connection successfully!");
})

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send({ "message": "Unauthorized request" })
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === "null") {
        return res.status(401).send({ "message": "Unauthorized request" })
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send({ "message": "Unauthorized request" })
    }
    req.userId = payload.subject
    next()
}

router.get("/", (req, res) => {
    res.send("From API route");
})

router.post('/register', async (req, res) => {
    let userData = req.body;
    const registeredUser = await User.create(userData);
    await registeredUser.save();
    if (registeredUser) {
        let payload = { subject: registeredUser._id }
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).json({ token })
    } else {
        res.status(400).json({ "message": "failed regisration" });
    }
})

router.post('/login', async (req, res) => {
    let userData = req.body;

    const user = await User.findOne({ email: userData.email });
    if (user) {
        if (req.body.password !== user.password) {
            res.status(401).send({ "message": "Invalid password" });
        } else {
            let payload = { subject: user._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).json({ token })
        }
    } else {
        res.status(400).send({ "message": "Invalid Email!Please Try again" });
    }
});

router.get('/events', async (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-01-23T18:25:43.5112"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-01-23T18:25:43.5112"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-01-23T18:25:43.5112"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-01-23T18:25:43.5112"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-01-23T18:25:43.5112"
        }
    ]
    // console.log("hii" + JSON.stringify(events))
    res.status(200).send(events);
})

router.get('/special', verifyToken,(req, res) => {
    let special = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-01-23T18:25:43.5112"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-01-23T18:25:43.5112"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-01-23T18:25:43.5112"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-01-23T18:25:43.5112"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-01-23T18:25:43.5112"
        },
    ]
    res.json(special);
})

module.exports = router