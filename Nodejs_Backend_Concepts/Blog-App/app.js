const path  = require('path');
const express = require('express');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes');
const sequelize  = require('./util/database');
const postController = require('./controllers/postController');// Assuming you have a 'Post' model
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Use the cors middleware
app.use(cors());
//app.set('view engine', 'ejs'); 
app.set('views','views');
app.set('views', path.join(__dirname, 'views')); // Specify the directory where your views are located
app.use(bodyParser.json({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
// Define a route for the root URL ("/")
app.get("/",(req, res)=>{
    const formPath = path.join(__dirname, 'views', 'form.html');
    res.sendFile(formPath);  
});


app.use('/',postRoutes)


//app.use('/', postRoutes);

sequelize.sync().then(() => {//{force: true}
  console.log('Database synchronized successfully.');

  // Start your express app after syncing the database
  app.listen(3000, () => {
      console.log('Server is running on port 3000');
  });
}).catch((error) => {
  console.error('Error syncing database:', error);
});