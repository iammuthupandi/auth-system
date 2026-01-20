const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const authenticate = require('../middlewares/authenticate');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/refresh', auth.refresh);
router.post('/logout', auth.logout);
router.get('/me', authenticate, auth.me);

module.exports = router;
