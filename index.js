import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";    
import e from "express";
const __dirname = dirname(fileURLToPath(import.meta.url));
import methodOverride from "method-override";


const app = express();
const port = 3000;

app.use(methodOverride('_method'));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {posts: posts});
});

app.get("/new", (req, res) => {
    res.render("pages/new.ejs");
});


app.get("/posts/:id/edit", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id == id);
    if(post){
        res.render("pages/edit.ejs", {post: post});
    }else{
        res.send("Post not found");
    }
});



app.get("/posts/:id/delete", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id == id);
    if(post){
        res.render("pages/delete.ejs", {post: post});
    }else{
        res.send("Post not found");
    }
});

app.delete("/posts/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const postIndex = posts.findIndex((post)=> post.id == id);
    if(postIndex){
        posts.splice(postIndex, 1);
        res.redirect("/");
    }else{
        return res.status(404).send("Post not Found")
    }
});

app.put("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id == id);
    if(post){
        post.title = req.body.title;
        post.content = req.body.content;
        res.redirect("/");
    }else{    
        res.send("Post not found");
    }
});
app.get("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id == id);
    if(post){
        res.render("pages/post.ejs", {post: post});
    }else{
        res.send("Post not found");
    }
    
});

let posts = [];
let currentid= 1

app.post("/posts", (req, res) => {
    const title = req.body.title;
    const content = req.body.content;

    const post = {
        id: currentid,
        title: title,
        content:content,
    };
    posts.push(post);
    currentid++;
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
app.set("view engine", "ejs");