var express = require("express");
var router = express.Router();
var Post = require("../models/post");
var Comment = require("../models/comment");
const CheckAuth = require("../middleware/check-auth");

/*
	Lista
	1- cambiar el index del post (borrar el populate y los comentarios) x
	2- Agregar una ruta index-post a los comentarios x
	3- probar con postman x
	4- cambia el modelo del post en angular (borrar Comments[])
	5- seprar los comment functions del post.service y los comment del detail
	6- crear servicio para para el comment (comment.service)
	7- crear comment-list y comment-item
	8- crear el nuevo UI del post-detail, comment-list y comment-item
*/

//INDEX
router.get("/", function(req, res){
	console.log("estas dentro de la api");
	Post.find({})
	.sort({created_at: -1})
	.exec()
	.then(foundPosts => {
		const newPost = foundPosts.map(foundPost => {
			return {
				_id: foundPost._id,
				title: foundPost.title,
				texto: foundPost.texto,
				categories: foundPost.categories,
				created_at: foundPost.created_at,
				author: foundPost.author
			};
		});
		res.status(200).json(newPost);
	})
	.catch(err => {
		res.status(500).json({
			message: "Los post no pudieron ser encontrados"
		});
	})
});

//POST req.userData
router.post("/", CheckAuth.checkAuth, function(req, res){
	console.log(req.body);
	console.log(req.userData);
	let newCategories = req.body.categories;
	if(!newCategories || newCategories.length < 1){
		newCategories = ["Ninguna"];
	}
	var newPost = new Post({
		title: req.body.title,
		categories: newCategories,
		texto: req.body.texto,
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
			categories: post.categories,
			texto: post.texto,
			created_at: post.created_at,
			author: post.author,
			comments: []
		});
	})
	.catch(err => {
		console.log("no se pudo mi rey");
		res.status(500).json({
			message: "El post no pudo ser creado"
		});
	});
});

//SHOW 
router.get("/:id", function(req, res){
	console.log("Estas dentro del show");
	Post.findById(req.params.id)
	.exec()
	.then(foundPost => {
		res.status(200).json({
			_id: foundPost._id,
			title: foundPost.title,
			texto: foundPost.texto,
			categories: foundPost.categories,
			created_at: foundPost.created_at,
			author: foundPost.author
		});
	})
	.catch(err => {
		res.status(500).json({message: "Post no pudo ser encontrado"});
	});
});

//UPDATE
router.patch("/:id", CheckAuth.checkPostOwnerShip, (req, res, next) =>{
	const id = req.params.id;
	//const updateOps = {};
	//solamente va a actualizar los campos que se encuentran
	//se pone porque no todos los campos seran llenados
	//por ejemplo solo se llenaran texto y titulo
	//pero _id, comments y author permanecen iguales
	  /*for (const ops of req.body) {
	    updateOps[ops.propName] = ops.value;
	  }*/

	  /*Post.findById(id)
	  .exec()
	  .then(findPost => {
	  	findPost.set({title: req.body.title, texto: req.body.texto})
	  	findPost.save()
	  	.then(savePost => {
	  		res.status(200).json({

	  		});
	  	})
	  	.catch()
	  })
	  .catch() */

	  Post.update({ _id: id }, { $set: {title: req.body.title, texto: req.body.texto, categories: req.body.categories} })
	    .exec()
	    .then(result => {
	      res.status(200).json({
	        message: "Post updated"
	      });
	    })
	    .catch(err => {
	      console.log(err);
	      res.status(500).json({
	        message: "post no puede ser actualizado"
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
				_id: result._id
			});
		})
		.catch(err => {
			res.status(500).json({
				message: "El comentario del post no puede ser borrado"
			});
		});
	})
	.catch(err => {
		res.status(500).json({
			message: "El post no puede ser borrado"
		})
	})
})


module.exports = router;