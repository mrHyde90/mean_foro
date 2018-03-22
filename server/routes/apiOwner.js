var express = require("express");
var router = express.Router();
var User = require("../models/user");
const CheckAuth = require("../middleware/check-auth");

//index users, usar solo como moderador
router.get("/", CheckAuth.checkAdminShip, function(req, res, next){
	User.find({})
	.exec()
	.then(users => {
		res.status(200).json(users);
	})
	.catch(err => {
		res.status(500).json({
			message: "Usuarios no encontrados"
		});
	})
});

//SHOW
router.get("/:userId",(req, res, next) => {
	User.findById(req.params.userId)
	.exec()
	.then(user => {
		res.status(200).json({
			user: {
				_id: user._id,
				username: user.username,
				email: user.email
			}
		})
	})
	.catch(err => {
		res.status(500).json({
			message : "usuario no encontrado"
		})
	})
})

//DELETE
router.delete("/:userId", CheckAuth.checkAdminShip, (req, res, next) => {
	console.log("lograste entrar");
	console.log(req.userData);
	const id = req.params.userId;
	User.remove({ _id: id })
	.exec()
	.then(deleteUser => {
		Post.remove({author: {id: deleteUser._id }})
		.exec()
		.then(removePost => {
			Comment.remove({postId: removePost._id})
			.exec()
			.then(deleteComment => {
				res.status(200).json({
					_id: deleteUser._id
				});
			})
			.catch(err => {
				res.status(500).json({
					message: "Comentario no puede ser removido"
				})
			})
		})
		.catch(err => {
			res.status(500).json({
				message: "Post no puede ser removido"
			})
		})
	})
	.catch(err => {
		res.status(500).json({
			message: "Usuario no puede ser removido"
		});
	});
})

module.exports = router;
