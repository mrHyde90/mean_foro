var express = require("express");
var router = express.Router({mergeParams: true});
var Comment = require("../models/comment");
var Post = require("../models/post");

//INDEX
router.get("/", (req, res, next)=>{
	console.log("pasa por aqui");
	Comment.find({}, function(err, comments){
		if(err) {
			console.log(err);
		} else {
			res.status(200).json(comments);
		}
	});
});

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
					foundPost.comments.push(newComment._id);
					foundPost.save();
					console.log("El comentario asido creado papi");
					res.status(201).json(newComment);
				}
			})
		}
	})
});

//SHOW
router.get("/:commentId", (req, res, next) => {
	const id = req.params.commentId;
	Comment.findById({_id: id})
	.exec()
	.then(result => {
		res.status(200).json(result);
	})
	.catch(err => {
		res.status(500).json({
			error: err
		});
	});
});

//DELETE
router.delete("/:commentId", (req, res, next) => {
	var id = req.params.commentId;
	Comment.remove({ _id: id})
	.exec()
	.then(result => {
		res.status(200).json({
			message: "comentario eliminado"
		});
	})
	.catch(err => {
		res.status(500).json({
			error: err
		});
	});
});

module.exports = router;