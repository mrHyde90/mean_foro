var express = require("express");
var router = express.Router({mergeParams: true});
var Comment = require("../models/comment");
var Post = require("../models/post");

//POST
router.post("/", function(req, res){
	var id = req.params.id;
	Post.findById(id, function(err, foundPost){
		if(err) {
			console.log(err);
		} else {
			Comment.create(req.body, function(err, newComment){
				if(err) {
					console.log(err);
				} else {
					foundPost.comments.push(newComment);
					foundPost.save();
					console.log("El comentario asido creado papi");
					res.status(201).json(newComment);
				}
			})
		}
	})
});

module.exports = router;