const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../client/public/index.html'))
})

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../client/public/signup.html'))
})

module.exports = router;