//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require('lodash');

//post array

const homeStartingContent = "Hello!, welcome to my blog website made with love using Nodejs and mongoDB. This blog website is in an initial version and several fixes and updates would be made subsequently, kindly understand because your satisfaction of the website is of paramount priority. The main aim of the website is for posting about complete walkthrough of different game plays enjoy!.....";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const posts = [];

mongoose.connect("mongodb://localhost:27017/blogDB");

//compose Schema
const composeSchema = {
  title:String,
  content:String
}
//model
const Post=mongoose.model("post", composeSchema);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//using ejs
app.set('view engine', 'ejs');

//home.ejs route. ejs then js
app.get("/", (req,res) => {

  Post.find({}, function(err, founditems){
    res.render("home", {homefirstcontent: homeStartingContent, posts:founditems});
})
  })

//about.ejs route. ejs then js
app.get("/about", (req,res) => {
    res.render("about", {aboutfirstcontent: aboutContent});
})

//contact.ejs route. ejs then js
app.get("/contact", (req,res) => {
    res.render("contact", {contactfirstcontent: contactContent});
})

//compose.ejs route. ejs then js
app.get("/compose", (req,res) => {
    res.render("compose");
})

//compose post method
app.post("/compose", (req,res) => {

  const newposts = new Post ({
    title:req.body.postTitle,
    content:req.body.postBody
  });//not an array yet
  newposts.save(function(err){
   if (!err){
     res.redirect("/");
   }
 });
})

//route parameter
app.get("/posts/:postId/", (req,res) => {
  // const requestedRoute= _.lowerCase(req.params.postId);
  const requestedPostId= req.params.postId;

  // posts.forEach((post) => {
  //   const storedTitle=_.lowerCase(post.postId);
  //
  //   if (requestedRoute === storedTitle){
  //     res.render("post", {titleDisplay:post.title, contentDisplay:post.content});
  //   }
  // })

  Post.findOne({_id: requestedPostId}, function(err, post){
   res.render("post", {title: post.title, content: post.content});
});

})

let port = process.env.PORT;
if(port == null || port==""){
  port =3000;
}

app.listen(port, function(){
  console.log("Server has strated successfully");

});
