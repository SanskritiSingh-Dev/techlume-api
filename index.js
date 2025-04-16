// basic step to create a server and check if it is working or not
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");



//to understand the incoming data
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//array to store the post related details
let posts = [
    {
        id:uuidv4(),
        username: "CodeNinja_23",
        content:"Always debugging life and JavaScript one line at a time."
    },
    {
        id:uuidv4(),
        username: "LazyLoop404",
        content:"Still stuck in an infinite loop... send help. 🌀"
    },
    {
        id:uuidv4(),
        username: "ByteBouncer",
        content:"Bouncing between backend bugs and frontend fixes."
    },
    {
        id:uuidv4(),
        username: "SyntaxWizard7",
        content:"Casting spells with clean code and coffee."
    },
    {
        id:uuidv4(),
        username: "PixelPenguin",
        content:"Sliding through designs with a frosty touch of creativity."
    }
];


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//insted of sending the message we have to render the posts
app.get("/posts", (req, res) =>{
    res.render("index.ejs", { posts });
});

//click to add a new post and new post form opens, it will render a form
app.get("/posts/new", (req,res) => {
    res.render("new.ejs");
});

//after writing the new post, when the submit button is clicked we want to go on posts page
app.post("/posts", (req, res) =>{
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({ id, username, content});
    res.redirect("/posts")
});

//to the the individual post by there ids
app.get("/posts/:id", (req, res) =>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});

//to update the content
app.patch("/posts/:id", (req,res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    console.log(newContent);
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts")
});

//to edit the content of the post
app.get("/posts/:id/edit", (req, res) =>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

// delte the post
app.delete("/posts/:id", (req, res) =>{
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});


