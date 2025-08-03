const express = require('express');
const router = express.Router();
const { sendBulkMail, getHistory } = require('../controllers/mailController');

router.post('/send', sendBulkMail);
router.get('/history', getHistory); 

module.exports = router;
