const express = require('express');
const userController = require('../userController');
const router = express.Router();

router.post('/signup', 
userController.createUser, 
(req, res) => {
    res.status(200).send('New User Created!');
})

//intended route for login checl
router.post('/login', 
userController.loginUser,
(req, res) => {
    res.status(200).json(res.locals.login);
})

module.exports = router;