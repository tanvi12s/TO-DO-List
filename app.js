const express = require('express')
const dbModel = require("./model")
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))//to include external files

app.use(express.json())//to parse the req body into JSON 

app.get('/', async(req, res) => {
    let tasks = [];
    try {
        tasks = await dbModel.getTask();
    } catch (err) {
        console.log('Error: ', err.message);
    }
    res.render('index.ejs', {tasks: tasks})// display the task
})

app.post('/list', async(req, res) => {
    let taskId = 0
    let statusCode = 201;
    try {
        const { task, time } = req.body; // extracting time and task from the req body
        if(task && time){
        taskId = await dbModel.addTask({task, time});
        }
        else{
            throw new Error('Invalid input!');
        }
    } catch (err) {
        statusCode = 400;
        console.log('Error: ', err.message);
    }
    res.status(statusCode).json({taskId});
})

app.delete('/list', async(req, res) => {
    let { taskId } = req.body
    let statusCode = 204;
    let deleted = false;
    try {
        if(taskId){
        await dbModel.delTask(taskId);
        deleted = true;
       }
       else{
        throw new Error('Invalid input!');
       }
    } catch (err) {
        statusCode = 400;
        console.log('Error: ', err.message);
    }
    res.status(statusCode).json({deleted});
})

app.put('/list',async(req,res) => {
    console.log("Req ID", req.body.id);
    console.log("Data ", req.body.data);
    let taskId = req.body.id;
    let statusCode = 200;
    let updated = false;
    try{
        if(taskId && req.body.data.task && req.body.data.time){
        await dbModel.editTask(taskId, req.body.data.task, req.body.data.time);
        updated = true;
        }
        else{
            throw new Error('Invalid input!');
        }
    }
    catch(err) {
        statusCode = 400;
        console.log('Error: ', err.message);
    }
    res.status(statusCode).json({updated});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

