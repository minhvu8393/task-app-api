const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const auth = require('../middlewares/auth');

router.post('/server/tasks', auth, async (req, res) => {
    try {
        let task = new Task(req.body);
        task.owner = req.user._id;
        await task.save();
        res.status(201).send({task});
    } catch(err) {
        res.status(500).send({error: err.message});
    }
})

router.get('/server/tasks/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        let task = await Task.findById(id);
        if (!task) {
            return res.send(404).send({error: 'Task does not exist'});
        }
        if (!task.hasPermission(req.user)) {
            return res.send(400).send({error: 'Do not have permission'});
        }
        res.send({task});
    } catch(err) {
        res.status(500).send({error: err.message});
    }
})

router.patch('/server/tasks/:id', auth, async (req, res) => {
    allowUpdateFields = ['title', 'description', 'completed'];
    requestUpdateFields = Object.keys(req.body);
    updateIsValid = requestUpdateFields.every((field) => {
        return allowUpdateFields.includes(field)
    })
    if (!updateIsValid) {
        return res.status(400).send('Invalid update');
    }
    try {
        const id = req.params.id;
        let task = await Task.findById(id);
        if (!task) {
            res.status(404).send({error: 'Task does not exist'});
        }
        if (!task.hasPermission(req.user)) {
            return res.send(400).send({error: 'Do not have permission'});
        }
        requestUpdateFields.forEach((field) => {
            task[field] = req.body[field];
        })
        await task.save();
        res.send({task});
    } catch(err) {
        res.status(500).send({error: err.message});
    }
});

router.delete('/server/tasks/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        let task = await Task.findById(id);
        if (!task) {
            return res.status(404).send({error: 'Task does not exist'});
        }
        if (!task.hasPermission(req.user)) {
            return res.status(400).send({error: 'Do not have permission'});
        }
        await task.remove();
        res.send();
    } catch(err) {
        res.status(500).send({error: err.message});
    }
})

module.exports = router;