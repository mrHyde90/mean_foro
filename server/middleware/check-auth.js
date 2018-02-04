const jwt = require('jsonwebtoken');
const Post = require("../models/post");
const Comment = require("../models/comment");
//poner el token en el header
exports.checkAuth = (req, res, next) => {
    try {
        //para quitar el bearer
        console.log("estas dentro del check");
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "secret");
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed camarada'
        });
    }
};

exports.checkPostOwnerShip = (req, res, next) => {
    try {
        const id = req.params.id;
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "secret");
        req.userData = decoded;
        Post.findById(id)
        .exec()
        .then(foundPost => {
            if(foundPost.author.id.equals(req.userData.userId)){
                next();
            } else{
                res.status(401).json({
                    message: "No eres tu hermano"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    } catch(error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};

exports.checkCommentOwnerShip = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "secret");
        req.userData = decoded;
    } catch(error) {
        return res.status(401).json({
            message: 'Auth failed camarada'
        });
    }
    const commentId = req.params.commentId;
    Comment.findById(commentId)
    .exec()
    .then(foundComment => {
        if(foundComment.author.id.equals(req.userData.userId)){
            console.log("Eres tu hermano");
            next();
        } else {
            res.status(401).json({
                message: "No eres tu hermano"
            });
        }
    })
    .catch(err => {
        return res.status(401).json({
            message: 'Auth failed'
        });
    });

};

