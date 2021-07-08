const express = require('express');
const app = express();
const foodmodel = require('./models/Food');
const usermodel = require('./models/User');
const mongoose = require('mongoose');
const cors = require('cors');
const { findById, findByIdAndRemove } = require('./models/Food');
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://1776771:1776771@crud.cd4yl.mongodb.net/CRUDtest?retryWrites=true&w=majority", {
    useNewUrlParser: true
})

app.get('/', async(req, res) => {
    const result = await usermodel.find({})
    res.send(result).status(200).end()
    
})

app.put('/add', async(req, res) => {
    const payload = req.body
    const final = new usermodel({
        username: payload.username,
        password: payload.password
    })

    try {
        await final.save()
        res.send("Success").status(201).end()
    } catch (error) {
        console.log(err)
    }
    
})

app.put('/update', async(req, res) => {
    const newUserName = req.body.username
    const newPassword = req.body.password
    const id = req.body._id

    try {
        await usermodel.findById(id,(err, updatedUser)=> {
            updatedUser.username = newUserName
            updatedUser.password = newPassword
            updatedUser.save()
            res.status(204).end()

        })
        
    } catch (err) {
        console.log(err)
    }
    
})

app.delete('/delete/:id', async(req, res) => {
    const id = req.params.id
    await usermodel.findByIdAndDelete(id,(err,result)=> {
        if (err){
            console.log(err)
        }
    })
    res.send("deleted")
})




app.listen(3001, ()=> {
    console.log('Server Running on port 3001...')
})