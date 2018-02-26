var express = require("express");
var router = express.Router();
var User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CheckAuth = require("../middleware/check-auth");
//SIGNUP
router.post("/signup", (req, res, next)=> {
	//asegurarnos de que sea unico
	console.log(req.body);
	User.find({email: req.body.email})
	.exec()
	.then(user => {
		if(user.length >= 1){
			return res.status(409).json({
				message: "mail exist"
			})
		} else {
			//encryptamos el password
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				if(err) {
					return res.status(500).json({
						error: err
					});
				} else {
					//creamos el nuevo usuario con el password encryptado
					const user = new User({
						email: req.body.email,
						username: req.body.username,
						password: hash
					});
					//lo salvamos en la database
					user.save()
					.then(result => {

						const token = jwt.sign(
						{
							email: result.email,
							username: result.username,
							userId: result._id
						},
						"secret", 
						{
							expiresIn: "1h"
						}
					);
						res.status(201).json({
							token: token,
							user: {
								_id: result._id,
								created_at: result.created_at,
								email: result.email,
								username: result.username
							}
						});
					})
					.catch(err => {
						res.status(500).json({
							error: err
						});
					});
				}
			});
		}
	});
});

//index users, usar solo como moderador
router.get("/", function(req, res, next){
	User.find({})
	.then(user => {
		res.status(200).json({
			message: "Success",
			user: user
		});
	})
	.catch(err => {
		res.status(500).json({
			error: err
		});
	})
});

//SHOW user
router.get("/:id",(req, res, next) => {
	User.findById(req.params.id)
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
			error : err
		})
	})
})

//LOGIN
router.post("/login", (req, res, next)=>{
	User.find({email: req.body.email})
	.exec()
	.then(user => {
		//checamos si se encuentra el usuario, si no esta rroja [] not null
		if(user.length < 1){
			return res.status(401).json({
				message: "Auth failed"
			});
		} 
			//comparamos los passwords
			bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
				if(err) {
					return res.status(401).json({
						message: "Auth failed"
					});
				} 
				if(result){
					//generamos el token
					const token = jwt.sign(
						{
							email: user[0].email,
							username: user[0].username,
							userId: user[0]._id
						},
						"secret", 
						{
							expiresIn: "1h"
						}
					);
					return res.status(200).json({
						token: token,
						user: {
							_id: user[0]._id,
							created_at: user[0].created_at,
							email: user[0].email,
							username: user[0].username
						}
					});
				}
				res.status(401).json({
					message: "Auth failed"
				});
			})
	})
	.catch(err => {
		res.status(500).json({
			error: err
		});
	});
})


//DELETE
router.delete("/:userId", CheckAuth.checkAuth, (req, res, next) => {
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
					message: "todo borrado"
				});
			})
			.catch(err => {
				res.status(500).json({
					error: err
				})
			})
		})
		.catch(err => {
			res.status(500).json({
				error: err
			})
		})
	})
	.catch(err => {
		res.status(500).json({
			error: err
		});
	});
})

module.exports = router;