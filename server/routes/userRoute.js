const express = require('express');

const userController = require('../controller/userController')

const router = express.Router();

router.get('/check-user/:email', userController.checkUser)
router.get('/get-allUsers/:email', userController.getAllUser)
router.post('/add-user', userController.addNewUser)
router.put('/update-user', userController.updateUser)

module.exports = router
