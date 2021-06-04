const mongoose = require("mongoose");
const express = require("express");

const fileUpload = require("express-fileupload");
const ejs = require("ejs");
const methodOverride = require("method-override");


const postController = require("./controllers/postController");
const pageController = require("./controllers/pageController");

const app = express();

mongoose.connect("mongodb+srv://mavi:zud9wDCfEVHkCZah@cluster0.zqpnj.mongodb.net/cleanblog-db?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(()=> {
  console.log("DB CONNECTED!")
}).catch((err)=> {
  console.log(err);
});

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //body bilgisini yakalamak için 2 adet middleware fonksiyonunu kullanmamız gerekir.
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

// ROUTES
app.get("/", postController.getAllPosts);
app.get("/posts/:id", postController.getPost);
app.post("/posts", postController.createPost);
app.put("/posts/:id", postController.updatePost);
app.delete("/posts/:id", postController.deletePost);

app.get("/about", pageController.getAboutPage);
app.get("/add_post", pageController.getAddPostPage);
app.get("/posts/edit/:id", pageController.getEditPage);



const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
