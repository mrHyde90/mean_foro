var express = require("express");
var router = express.Router();
var Post = require("../models/post");

//INDEX
router.get("/", function(req, res){
	console.log("estas dentro de la api");
	Post.find({}).populate("comments").exec(function(err, allPost){
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
			res.status(201).json(nuevoContacto);
		}
	});
});

//SHOW show a campground
router.get("/:id", function(req, res){
	console.log("Estas dentro del show");
    Post.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
        	res.status(200).json(foundCampground);
        }
    });
});
module.exports = router;