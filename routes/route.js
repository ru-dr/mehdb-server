const express = require('express');
const router = express.Router();
const agePopsController = require('../controllers/agepopscontroller');
const loginController = require('../controllers/loginController');
const registerUser = require('../controllers/registerController');
const uploadData = require('../models/uploadCsv');
const uploadController = require('../controllers/uploadcsvController');
const shemeController = require('../controllers/schemeController');

router.get('/', (req, res) => {
  res.send('Hello World');
});

router.get('/agepops', agePopsController.getAgePops);
router.post('/login', loginController.login);
router.post('/register', registerUser);
router.post('/upload', uploadController.upload);
router.post('/addScheme', shemeController.schemeDetails);

module.exports = router;
