var express = require("express");
var router = express.Router();
var User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


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
						res.status(201).json({
							message: "User created"
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
							userId: user[0]._id
						},
						"secret", 
						{
							expiresIn: "1h"
						}
					);
					return res.status(200).json({
						message: "Auth successful",
						token: token
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
router.delete("/:userId", (req, res, next) => {
	const id = req.params.userId;
	User.remove({ _id: id })
	.exec()
	.then(result => {
		res.status(200).json({
			message: "Usuario borrado"
		});
	})
	.catch(err => {
		res.status(500).json({
			error: err
		});
	});
})

module.exports = router;