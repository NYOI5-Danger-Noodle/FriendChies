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
userController.verifyAuth, 
(req, res) => {
    res.status(200).send('Went through all the login middleware');
})

module.exports = router;