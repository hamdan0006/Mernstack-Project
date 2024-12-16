const express = require('express');
const router = express.Router();
const userdtls = require('../controllers/user-controller');

router.route('/contact').post(userdtls);

module.exports = router;
