// =======================
// Blog Web App Group 3 - app.js
// =======================

// Dependencies
const express = require('express');
const path = require('path');

// App Initialization
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// In-Memory Data Store
const posts = []; // Shared array for all CRUD operations

// Helper Function
function getMessage(req) {
  return req.query.msg || null;
}

// Routes (Victoria's Section)
// Homepage Route
app.get('/', (req, res) => {
  const sorted = [...posts].sort((a, b) => b.id - a.id);
  res.render('index', { posts: sorted, msg: getMessage(req) });
});

// Route for Viewing a Single Post
app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === +req.params.id);
  if (!post) {
    return res.status(404).render('post', { post: null, error: 'Post not found.' });
  }
  res.render('post', { post, msg: getMessage(req), error: null });
});


// Catch-all 404 handler — to handle any unmatched routes
// Sends a styled HTML response when no route matches the incoming request
app.use((req, res) => {
  res.status(404).send(`
    <main style="text-align:center; padding:2rem;">
      <h1>404 – Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/">Back to Home</a>
    </main>
  `);
});

// Global error handler — catches runtime errors thrown in routes or middleware
// Logs the error stack for debugging and returns a styled 500 error page
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
