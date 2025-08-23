app.get('/post/:id/edit', (req, res) => {
  const postId = req.params.id;
  const post = postMessage.find(p => p.id === postId);
  if (!post) {
    return res.status(404).render('error', {message: 'Post not found' });
  }
  res.render('edit', {post, successMessage: null, errorMessage: null});
}


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
