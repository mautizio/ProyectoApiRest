const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controllers');

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.post('/refresh', authCtrl.refresh);

module.exports = router;
