const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth');

router.post('/server/users', async (req, res) => {
    try {
        let user = new User(req.body);
        await user.save();
        let token = user.addToken(user);
        await user.save();
        res.cookie('token', token);
        res.status(201).send({user});
    } catch(err) {
        res.status(500).send({error: err.message});
    }
})

router.post('/server/users/login', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(400).send({error: 'Invalid Login'});
        }
        const passwordIsCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!passwordIsCorrect) {
            return res.status(400).send({error: 'Invalid Login'});
        }
        const token = user.addToken();
        await user.save();
        await user.populate('tasks').execPopulate();
        res.cookie('token', token, {httpOnly: true});
        res.send({user});
    } catch(err) {
        res.status(500).send({error: err.message});
    }
})

router.post('/server/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        });
        await req.user.save();
        res.send();
    } catch(err) {
        res.status(500).send({error: err.message});
    }
})

router.get('/server/users', auth, async (req, res) => {
    try {
        await req.user.populate('tasks').execPopulate();
        res.send({user: req.user});
    } catch(err) {
        res.status(500).send({error: err.message});
    }
})

router.patch('/server/users', auth, async (req, res) => {
    allowUpdateFields = ['name', 'password'];
    requestUpdateFields = Object.keys(req.body);
    updateIsValid = requestUpdateFields.every((field) => {
        return allowUpdateFields.includes(field)
    })
    if (!updateIsValid) {
        return res.status(400).send('Invalid update');
    }
    try {
        requestUpdateFields.forEach((field) => {
            req.user[field] = req.body[field]
        })
        await req.user.save();
        res.send(req.user);
    } catch(err) {
        res.status(500).send({error: err.message});
    }
})

router.delete('/server/users', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send();
    } catch(err) {
        res.status(500).send({error: err.message});
    }
})

module.exports = router;