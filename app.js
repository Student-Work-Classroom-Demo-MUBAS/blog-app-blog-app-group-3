app.get('/post/:id/edit', (req, res) => {
  const postId = req.params.id;
  const post = postMessage.find(p => p.id === postId);
  if (!post) {
    return res.status(404).render('error', {message: 'Post not found' });
  }
  res.render('edit', {post, successMessage: null, errorMessage: null});
});