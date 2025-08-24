// =======================
// Blog Web App - app.js
// =======================

// Dependencies
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// In-Memory Data Store
let posts = [];
let nextId = 1;

// Helper Function
function getMessage(req) {
  return req.query.msg || null;
}

// Homepage Route — shows all posts
app.get('/', (req, res) => {
  const sorted = [...posts].sort((a, b) => b.id - a.id);
  res.render('index', { posts: sorted, msg: getMessage(req) });
});

// Route to list all posts (same as home )
app.get('/posts', (req, res) => {
  const sorted = [...posts].sort((a, b) => b.id - a.id);
  res.render('index', { posts: sorted, msg: getMessage(req) });
});

// Route to render post creation form
app.get('/posts/new', (req, res) => {
  res.render('create', { error: null });
});

// Route to handle post submission
app.post('/posts', (req, res) => {
  const { title, content } = req.body;

  if (!title.trim() || !content.trim()) {
    return res.status(400).render('create', {
      error: 'Both title and content are required.'
    });
  }

  const newPost = {
    id: nextId++,
    title,
    content,
    createdAt: new Date()
  };

  posts.push(newPost);
  res.redirect(`/posts/${newPost.id}`);
});

// Route for viewing a single post
app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === +req.params.id);
  if (!post) {
    return res.status(404).render('post', { post: null, error: 'Post not found.', msg: null });
  }
  res.render('post', { post, msg: getMessage(req), error: null });
});

// Route to render edit form with feedback support
app.get('/posts/:id/edit', (req, res) => {
  const post = posts.find(p => p.id === +req.params.id);
  if (!post) {
    return res.status(404).render('error', { message: 'Post not found' });
  }
  res.render('edit', {
    post,
    successMessage: req.query.success || null,
    errorMessage: req.query.error || null
  });
});

// Route to handle post update with validation and feedback
app.post('/posts/:id/edit', (req, res) => {
  const post = posts.find(p => p.id === +req.params.id);
  if (!post) {
    return res.status(404).render('error', { message: 'Post not found' });
  }

  const { title, content } = req.body;
  if (!title.trim() || !content.trim()) {
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


// Route to delete a post
app.post('/posts/:id/delete', (req, res) => {
  const id = +req.params.id;

  // find index of the post
  const index = posts.findIndex(p => p.id === id);

  // Error handling for non-existent posts
  if (index === -1) {
    return res.status(404).send(`
      <main style="text-align:center; padding:2rem;">
        <h1>404 – Not Found</h1>
        <p>Post not found.</p>
        <a href="/">Back to Home</a>
      </main>
    `);
  }

  // remove the post from the array
  posts.splice(index, 1);

  // redirect to home with success message
  res.redirect('/?msg=Post+deleted+successfully');
});


// Catch-all 404 handler
app.use((req, res) => {
  res.status(404).send(`
    <main style="text-align:center; padding:2rem;">
      <h1>404 – Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/">Back to Home</a>
    </main>
  `);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`
    <main style="text-align:center; padding:2rem;">
      <h1>500 – Server Error</h1>
      <p>Something went wrong. Please try again later.</p>
      <a href="/">Back to Home</a>
    </main>
  `);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
