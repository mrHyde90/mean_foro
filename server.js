const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Post = require("./server/models/post");
const postRoutes = require("./server/routes/apiPost");
const seedDB = require("./server/seedDB");

const url = "mongodb://localhost/mean_foro";
mongoose.connect(url);

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res){
	res.send("Hola amigos");
});

seedDB();

app.use("/api/post", postRoutes);

var server = app.listen(3000, function(){
	console.log("Bienvenido a la applicacion");
});