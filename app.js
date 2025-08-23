const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require("method-override"); //method-override to simulate PUT and DELETE requests because HTML forms don’t support them natively keeping routing RESTful and modular

// In-memory data store
let posts = [
   {id: 1, title: "First Post", content: "The first post."},
   {id: 2, title: "Second Post", content: "The second post."}
];
let nextId = 1;

// View engine & middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));//Enables parsing of form data(req.body)
// app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method")); //allows PUT and DELETE via query string (_method)
//renders the lists of posts with edit button
app.get('/posts', (req, res) => {
   res.render('views/index', { views});
});

//edit route
app.get("/posts/edit/:id", (req, res) => {
 const {id} = req.params;
 const post = posts.find(p => p.id == id);
 res.render("posts/edit", { post }); //passes post to EJS view
});

//update route
app.put("/posts/edit/:id", (req, res) => {
 const {id} = req.params;
 const {title, content} =req.body;
 const post = posts.find(p => p.id == id);
 post.title = title;
 post.content = content;
 res.redirect('/post/');
});
 
//Delete route
app.delete("/posts/:id",(req, res) => {
   const {id} = req.params;
   posts = posts.filter(p => p.id != id);
   res.render("posts/delete-succes", {deletedId: id}); // success view
});

app.listen(3000, () => {
   console.log("server running on http://localhost:3000");
});