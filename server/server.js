const express = require('express');
//const usermodel = require('./models/user');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db')
const dotenv = require('dotenv');

//dunno
dotenv.config({path: './config/config.env'});
connectDB();

//read Json for express
const app = express();
app.use(express.json())
app.use(cors())

//Login path
const auth = require('./routes/auth.routes')
app.use('/api/auth', auth)



app.get('/', (req, res) => {
    res.send('Hello World!')
})

//Port
const PORT = process.env.PORT
app.listen(PORT, ()=> {
    console.log(`Server Running on port ${PORT}`)
})


/*

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

*/