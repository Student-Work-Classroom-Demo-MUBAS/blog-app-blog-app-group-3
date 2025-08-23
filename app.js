// =======================
// Blog Web App Group 3 - app.js
// =======================

// Dependencies
const express = require ('express');
const bodyParser = require('body-parser'); // or use express built-in
const path = require('path');

// App Initialization
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// In-Memory Data Store
const posts = []; // Shared array for all CRUD operations

// Routes (Victoria's Section)
// Route for Viewing a Single Post
app.get('/posts/:id', (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).render('404', { message: 'Post not found' });
  }

  res.render('post', { post });
});

