const express = require('express');
const router = express.Router();

router.get('/products', (req, res) => {
    res.sendFile(__dirname + '/views/shop.html');
});

module.exports = router;
