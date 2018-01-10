var express = require("express");
var router = express.Router();
var Post = require("../models/post");

//INDEX
router.get("/", function(req, res){
	console.log("estas dentro de la api");
	Post.find({}, function(err, allPost){
		if(err) {
			console.log(err);
		} else {
			res.status(200).json(allPost);
		}
	});
});

//POST
router.post("/", function(req, res){
	var newPost = req.body;
	Post.create(newPost, function(err, nuevoContacto){
		if(err) {
			console.log(err);
		} else {
			res.status(201).json(nuevoContact);
		}
	});
});

module.exports = router;