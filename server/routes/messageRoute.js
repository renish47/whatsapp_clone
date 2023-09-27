const express = require('express')
const messageController = require('../controller/messageController')
const router = express.Router()


router.post("/add-message", messageController.addMessage)
router.get("/get-messages/:from/:to", messageController.getMessages)
router.get("/get-message-list/:from", messageController.getMessageList)

module.exports = router