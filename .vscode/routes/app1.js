const express = require('express');
const bodyParser = require('body-parser');
const app1 = express();

app1.use(bodyParser.urlencoded({ extended: false }));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app1.use('/admin', adminRoutes);
app1.use(shopRoutes);

module.exports = app1;
