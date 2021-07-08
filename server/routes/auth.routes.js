const express = require('express');
const router = express.Router();
const userSchema = require("../models/users")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

//signin
router.post('/signin', (req, res, next) => {

    let getUser;
    userSchema.findOne({
        //find the data with Email 
        email : req.body.email
    })
    .then((data) => {

        //check data
        if (!data) {
            return res.status(401).json({message: "Auth Failed"})
        }

        getUser = data
        return bcrypt.compare(req.body.password, data.password)

    }).then((response) => {

        //check password
        if (!response) {
            return res.status(401).json({message: "Password Failed"})
        }
        
        //generate token
        let jwtToken = jwt.sign(
            
            {
            email : getUser.email,
            userId : getUser._id
            },
            'your-256-bit-secret',
            {
         //       expiresIn: '1h',
            }

            )
            try{
             res.status(200).json(
                {
                    token : jwtToken,
              //      expiresIn : 3600,
                    msg : getUser,
                })
            }catch (error)  {
                return res.status(401).json({message : error})
            }
    })

 

})

//sign up

router.post('/register', (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
    .then( (data) => {

        const user = new userSchema({
            name : req.body.name,
            email : req.body.email,
            password : data
        })
        user.save().then(response => {
            res.status(201).json(
                {
                    message: "User Create",
                    result : response,
                })
                
        })
    })
})

router.route('/all-user').get(auth, (req, res, next) => { 
    userSchema.find({}).then( (data) => {
        res.json(data)
    })
    
})

module.exports = router