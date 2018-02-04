var express = require("express");
var router = express.Router();
var Post = require("../models/post");
var Comment = require("../models/comment");
const CheckAuth = require("../middleware/check-auth");

//INDEX
router.get("/", function(req, res){
	console.log("estas dentro de la api");
	Post.find({})
	.populate("comments")
	.exec()
	.then(foundPosts => {
		const newPost = foundPosts.map(foundPost => {
			const comentarios = foundPost.comments.map(foundComments => {
				return {
					_id: foundComments._id,
					text: foundComments.text,
					author: foundComments.author
				};
			});
			return {
				_id: foundPost._id,
				title: foundPost.title,
				texto: foundPost.texto,
				author: foundPost.author,
				comments: comentarios
			};
		});
		res.status(200).json(newPost);
	})
	.catch(err => {
		res.status(500).json({
			error: err
		});
	})
});

//POST req.userData
router.post("/", CheckAuth.checkAuth, function(req, res){
	console.log(req.body);
	console.log(req.userData);
	var newPost = new Post({
		title: req.body.title,
		texto: req.body.text,
		author: {
			id: req.userData.userId,
			username: req.userData.username
		}
	});
	newPost.save()
	.then(post => {
		res.status(201).json({
			_id: post._id,
			title: post.title,
			texto: post.texto,
			author: post.author,
			comments: []
		});
	})
	.catch(err => {
		console.log("no se pudo mi rey");
		res.status(500).json({
			error: err
		});
	});
});

//SHOW 
router.get("/:id", function(req, res){
	console.log("Estas dentro del show");
	Post.findById(req.params.id)
	.populate("comments")
	.exec()
	.then(foundPost => {
		const newComments = foundPost.comments.map(newComment => {
			return {
				_id: newComment._id,
				text: newComment.text,
				author: newComment.author.username
			};
		});
		res.status(200).json({
			_id: foundPost._id,
			title: foundPost.title,
			texto: foundPost.texto,
			author: foundPost.author.username,
			comments: newComments
		});
	})
	.catch(err => {
		res.status(500).json({error: err});
	});
});

//UPDATE
router.patch("/:id", CheckAuth.checkPostOwnerShip, (req, res, next) =>{
	const id = req.params.id;
	const updateOps = {};
	//solamente va a actualizar los campos que se encuentran
	  for (const ops of req.body) {
	    updateOps[ops.propName] = ops.value;
	  }
	  Post.update({ _id: id }, { $set: updateOps })
	    .exec()
	    .then(result => {
	      res.status(200).json({
	        message: "Post updated"
	      });
	    })
	    .catch(err => {
	      console.log(err);
	      res.status(500).json({
	        error: err
	      });
	    });
});

//DELETE
router.delete("/:id", CheckAuth.checkPostOwnerShip, (req, res, next)=>{
	console.log("Hola dentro del delete");
	const id = req.params.id;
	Post.remove({ _id: id })
	.exec()
	.then(result => {
		Comment.remove({postId: result._id})
		.then(deleteComments => {
			res.status(200).json({
				message: "comentarios borrados"
			});
		})
	})
	.catch(err => {
		res.status(500).json({
			message: "Error"
		})
	})
})

module.exports = router;