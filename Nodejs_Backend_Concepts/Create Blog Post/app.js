const path  = require('path');
const express = require('express');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes');
const { sequelize, Post } = require('./util/database'); // Assuming you have a 'Post' model

const app = express();
const PORT = process.env.PORT || 3000;

// Use the cors middleware
app.use(cors());

app.set('views','views');
app.set('views', path.join(__dirname, 'views')); // Specify the directory where your views are located

// Define a route for the root URL ("/")
app.get("/",(req, res)=>{
    const postPath = path.join(__dirname, 'views', 'form.ejs');
    res.sendFile(postPath);  
});


app.use('/',postRoutes)


//app.use('/', postRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
