const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const auth = async function(req, res, next) {
    try {
        let token = req.cookies.token;
        if (!token) {
            return res.status(400).send({error: 'Please Login'});
        }
        token = token.replace('Bearer ', '');
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decode._id);
        if (!user) {
            return res.status(400).send({error: 'Invalid authorization'});
        }
        hasToken = user.tokens.filter((value) => {
            return value.token === token;
        })
        if (hasToken.length === 0) {
            return res.status(400).send({error: 'Invalid authorization'});
        }
        req.user = user;
        req.token = token;
    } catch(err) {
        return res.status(500).send(err.message);
    }
    next()
}

module.exports = auth;