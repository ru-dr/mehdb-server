const express = require('express')
const router = express.Router()
const agePopsController = require('../controllers/agepopscontroller')


router.get('/', (req, res) => {
    res.send('Hello World')
})
router.get('/agepops', agePopsController.getAgePops)

module.exports = router