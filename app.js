//express
const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes=require('./routes/blogRoutes');
const { render } = require("ejs");

const app = express();

//connect to mongoDB
const dbURI =
  "mongodb+srv://Test:test123@blog.mwtvs.mongodb.net/Blog?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

//ejs for views
app.set("view engine", "ejs");

//middleware and static
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  var log = `hostname: ${req.hostname}, path: ${req.path}, method: ${req.method} \n`;
  fs.writeFile("./logs.txt", log, { flag: "a" }, () => {
    console.log("log was succesfull");
  });
  next();
});

//routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

//blog routes
app.use('/blogs',blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
