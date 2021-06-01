const mongoose = require("mongoose");
const express = require("express");

const ejs = require("ejs");
const path = require("path");

const Post = require('./models/Post');

const app = express();

mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


//TEMPLATE ENGINE
app.set("view engine", "ejs");


//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended:true})); //body bilgisini yakalamak için 2 adet middleware fonksiyonunu kullanmamız gerekir.
app.use(express.json());


app.get('/', async (req, res) => {
  const posts = await Post.find({});

  res.render('index', {
    posts
  })
});

app.get("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id)
  res.render("post", {
    post
  })

});

app.get("/about", (req, res) => {
  res.render("about");

});

app.get("/add_post", (req, res) => {
  res.render("add_post");

});

app.get("/post", (req, res) => {
  res.render("post");

});

app.post("/posts", async (req, res) => {
  await Post.create(req.body);
  res.redirect("/")

});





const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
