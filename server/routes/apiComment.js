var express = require("express");
var router = express.Router({mergeParams: true});
var Comment = require("../models/comment");
var Post = require("../models/post");
const CheckAuth = require("../middleware/check-auth");

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
router.post("/", CheckAuth.checkAuth, function(req, res){
	var id = req.params.id;
	Post.findById(id)
	.exec()
	.then(foundPost => {
		var newComment = new Comment({
			text: req.body.text,
			postId: foundPost._id,
			author: {
				id: req.userData.userId,
				username: req.userData.username
			}
		});
		newComment.save()
		.then(comment => {
			foundPost.comments.push(comment._id);
			foundPost.save();
			res.status(201).json({
				_id: comment._id,
				text: comment.text,
				author: comment.author
			});
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
	})
	.catch(err => {
		res.status(500).json({
			error: err
		});
	}); 
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

//UPDATE


//DELETE
router.delete("/:commentId", CheckAuth.checkCommentOwnerShip, (req, res, next) => {
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