const express = require('express');
const app = express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);

// 404 Error Handling
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/views/404.html');
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
