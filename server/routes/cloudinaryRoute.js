const express = require('express')
const router = express.Router()

const cloudinaryController = require('../controller/cloudinaryController')


router.get("/getSignature", cloudinaryController.getSignature)

module.exports = router