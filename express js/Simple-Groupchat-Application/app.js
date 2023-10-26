const express = require('express');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const Message = require('./models/Message');

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost/chatapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
        if (user.password !== password) { return done(null, false, { message: 'Incorrect password.' }); }
        return done(null, user);
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.sendStatus(200);
});

app.post('/message', async (req, res) => {
    const { message } = req.body;
    if (message) {
        const newMessage = new Message({ username: req.user.username, message });
        await newMessage.save();
        res.sendStatus(200);
    } else {
        res.status(400).send('Invalid message');
    }
});

app.get('/messages', async (req, res) => {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
});

app.get('/check-auth', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ isAuthenticated: true, username: req.user.username });
    } else {
        res.json({ isAuthenticated: false });
    }
});

const PORT = 6000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
