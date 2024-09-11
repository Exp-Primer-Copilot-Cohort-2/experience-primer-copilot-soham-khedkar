// Create web server with express
const express = require('express');
const app = express();

// Load comments data
const fs = require('fs');
const comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

// Create route to get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Create route to get comments by id
app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments.find(comment => comment.id === id);
  res.json(comment);
});

// Create route to post a comment
app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push(comment);
  fs.writeFileSync('comments.json', JSON.stringify(comments, null, 2));
  res.json(comment);
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

