const dotenv = require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
const port=3000;

app.use(bodyParser.json());
app.use(cors());

const Secret = "SuperSecret3";

const todoSchema = new mongoose.Schema({
  title : String,
  description: String,
  startDate: Date
});

const todoModel = mongoose.model('todoModel' , todoSchema);
mongoose.connect(dotenv.parsed.CONNECTIONURL);


app.get('/todos', async (req, res) => {   
    const results = await todoModel.find({});
    res.status(201).json(results);
           
});


app.get('/todos/:id', async (req, res) => {
    try{
        const todo = await todoModel.findOne({_id: req.params.id});
        res.status(201).json(todo)
        if(!todo){
            res.status(404).json({message: "Can not find todo"})
        }  
    } catch (error){
        res.status(500).json({message: error.message})
    } 
});

app.post('/todos', async (req, res) => {
try{
        const task = {
        title: req.body.title,
        description: req.body.description,
        startDate: new Date()
    };
  newTodo = new todoModel(task);
  await newTodo.save();
  res.status(201).json(task);
} catch(error) {
    res.status(500).json({message: error.message})
}
});


app.put('/todos/:id', async (req, res) => {
    try{
        const updatedTodo = await todoModel.findOneAndUpdate(
            {_id: req.params.id} , 
            {title: req.body.title , 
            description: req.body.description ,
            startDate: new Date()},
            {new: true,
            upsert: true}
        
        )
        res.status(201).json(updatedTodo);
        if(!updatedTodo){
            res.status(404).json({message: "Can not find todo"})
        }
    } catch(error) { 
        res.status(500).json({message: error.message});
    } 
});

app.delete('/todos/:id', async (req, res) => {
    try{
    const deleted = await todoModel.findOneAndDelete({_id: req.params.id});
    res.status(201).json(deleted);
    if(!deleted){
        res.status(404).json({message: "Can not find todo"});
    }    
} catch(error) {
    res.status(500).json({message: error.message});
}
});

// for all other routes, return 404
app.use((req, res, next) => {
  res.status(404).send();
});

module.exports = app;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })