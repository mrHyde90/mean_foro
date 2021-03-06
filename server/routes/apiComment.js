var express = require("express");
var router = express.Router({mergeParams: true});
var Comment = require("../models/comment");
var Post = require("../models/post");
const CheckAuth = require("../middleware/check-auth");

//INDEX
router.get("/", (req, res, next)=>{
	const id = req.params.id;
	Comment.find({postId: id})
	.exec()
	.then(comments => {
		const newComments = comments.map(foundComment => {
			return{
				_id: foundComment._id,
				text: foundComment.text,
				created_at: foundComment.created_at,
				author: foundComment.author
			};
		}); 
		res.status(200).json(newComments);
	})
	.catch(err => {
		res.status(500).json({
			message: "Comentario no encontrado"
		});
	})
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
				created_at: comment.created_at,
				text: comment.text,
				author: comment.author
			});
		})
		.catch(err => {
			res.status(500).json({
				message: "Comentario no pudo ser salvado"
			});
		});
	})
	.catch(err => {
		res.status(500).json({
			message: "El post no fue encontrado"
		});
	}); 
});

//INDEX-POST, 
router.get("/indexpost", (req, res, next) => {
	const id = req.params.id;
	Post.findById(id)
	.populate("comments")
	.exec()
	.then(post => {
		const comentarios = post.comments.map(foundComments => {
			return {
				_id: foundComments._id,
				text: foundComments.text,
				created_at: foundComments.created_at,
				author: foundComments.author
			};
		});
		res.status(200).json(comentarios)
	})
	.catch(err => {
		res.status(200).json({
			message: "El post no pudo ser encontrado"
		});
	})
})

//UPDATE, actualizar en el front 
router.patch("/:commentId",CheckAuth.checkCommentOwnerShip, (req, res, next) =>{
	const id = req.params.commentId;
	Comment.update({_id: id}, {$set: {text: req.body.text}})
	.exec()
	.then(result => {
		res.status(200).json({
			message: "Comment updated"
		});
	})
	.catch(err => {
		res.status(500).json({
			message: "El comentario no pudo ser actualizado"
		});
	})
})


//DELETE, eliminarr el el front
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
			message: "Cmentario no pudo ser eliminado"
		});
	});
});

module.exports = router;