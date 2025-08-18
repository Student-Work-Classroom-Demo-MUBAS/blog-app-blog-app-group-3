
const express = require('express');
const app = express();
const methodOverride = require('method-override');

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// Temporary in-memory post storage
const posts = [];

// RENDER POST CREATION FORM
app.get('/posts/new', (req, res) => {
  res.render('create'); // matches views/create.ejs
});
app.get('/', (req, res) => {
  res.render('index', { posts });
});


// HANDLE FORM SUBMISSION
app.post('/posts', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send('All fields are required.');
  }

  // Save post to memory
  posts.push({ title, content });

  // Log the post to the terminal
  console.log("New post submitted:");
  console.log({ title, content });

  res.redirect('/');
});

// HOME ROUTE – Show all posts
app.get('/', (req, res) => {
  res.render('index', { posts });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
  
});
