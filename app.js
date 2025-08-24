const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

//Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

//in memory post storage
const posts = [];

app.get('/posts/:id/edit', (req, res) => {
  const postId = req.params.id;
  const post = posts.find(p => p.id === postId);
  if (!post) {
    return res.status(404).render('error', {message: 'Post not found' });
  }
  res.render('edit', {post, successMessage: null, errorMessage: null});
});

//route post update 
app.post('/posts/:id/edit', (req, res) => {
  const postId = req.params.id;
  const post = posts.find(p => p.id === postId);
  if (!post) {
    return res.status(404).render('error', { message: 'Post not found' });
  }

  const { title, content } = req.body;
  if (!title || !content) {
    return res.render('edit', {
      post,
      errorMessage: 'Both fields are required.',
      successMessage: null
    });
  }

  post.title = title;
  post.content = content;

  res.render('edit', {
    post,
    successMessage: 'Post updated successfully!',
    errorMessage: null
  });
});

app.get('/', (req, res) => {
  res.send('Server is working! You can now test your routes.');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});