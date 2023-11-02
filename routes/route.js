const express = require('express');
const router = express.Router();
const agePopsController = require('../controllers/agepopscontroller');
const loginController = require('../controllers/loginController');
const registerUser = require('../controllers/registerController');

router.get('/', (req, res) => {
  res.send('Hello World');
});

router.get('/agepops', agePopsController.getAgePops);
router.post('/login', loginController.login);
router.post('/register', registerUser);

module.exports = router;
