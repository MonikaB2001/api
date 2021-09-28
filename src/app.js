require("./db/mongoose");
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();

const Task = require("./models/task");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//api to get all the typicode from the given url
app.get('/api/typicode', function (req, res) {
    try {
        request({
            url: 'https://jsonplaceholder.typicode.com/posts',
            json: true
        }, function (error, response, body) {
            res.status(200).send(body);
        })
    } catch (e) {
        console.log("Error", e);
        res.status(500).send("Internal Server Error")
    }
});

//to get all task from task collection
app.get('/api/tasks', async function (req, res) {
    try {
        var tasks = await Task.find(req.query);
        res.status(200).send(tasks);
    } catch (e) {
        console.log("Error", e);
        res.status(500).send("Internal Server Error");
    }
})

//to create new task in task collection
app.post('/api/tasks', async function (req, res) {
    try {
        var task = new Task(req.body);
        await task.save();
        res.status(200).send(task);
    } catch (e) {
        console.log("Error", e);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(7000, function (req, res) {
    console.log("Port is running in 7000");
})