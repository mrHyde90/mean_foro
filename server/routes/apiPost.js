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
	console.log(req.body);
	var newPost = req.body;
	Post.create(newPost, function(err, nuevoContacto){
		if(err) {
			console.log(err);
		} else {
			res.status(201).json(nuevoContacto);
		}
	});
});

//SHOW 
router.get("/:id", function(req, res){
	console.log("Estas dentro del show");
    Post.findById(req.params.id).populate("comments").exec(function(err, foundpost){
        if(err){
            console.log(err);
        } else {
        	res.status(200).json(foundPost);
        }
    });
});

//DELETE
router.delete("/:id", (req, res, next)=>{
	const id = req.params.id;
	Post.remove(id)
	.exec()
	.then(result => {
		res.status(200).json({
			message: "post borrado"
		})
	})
	.catch(err => {
		res.status(500).json({
			message: "Error"
		})
	})
})

module.exports = router;