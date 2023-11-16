const path = require('path');
const express = require('express');
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');

const sequelize = require('./util/database');
const cors = require('cors');

const app = express();
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', 'views');

// Uncomment the following line if you want to handle 404 errors
// app.use(errorController.get404);

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render('form.ejs');
});

app.use('/user', userRoutes);

sequelize.sync() //{force: true} every time you run it deletes all the records.
    .then(result => {
        app.listen(4000, () => {
            console.log('Server is running on port 4000');
        });
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });
