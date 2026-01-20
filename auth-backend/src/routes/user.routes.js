const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const userController = require('../controllers/user.controller');

router.get('/', authenticate, authorize(['admin']), userController.getUsers);

module.exports = router;
