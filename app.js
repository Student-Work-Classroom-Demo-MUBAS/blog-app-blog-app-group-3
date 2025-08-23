const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public')); // if you're serving CSS from /public/style.css


// In-memory store (if not already declared)
let posts = [];
let nextId = 1;

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

  posts.push({
    id: nextId++,
    title,
    content,
    createdAt: new Date()
  });

  res.redirect(`/posts/${nextId - 1}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('<h2>Welcome to the Blog App</h2><p><a href="/posts/new">Create a New Post</a></p>');
});

app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  const post = posts.find(p => p.id === parseInt(id));
  if (!post) {
    return res.status(404).send('Post not found');
  }
  res.render('post', { post });
});

