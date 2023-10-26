const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/views/admin.html');
});

module.exports = router;
