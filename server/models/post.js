var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
	title: String,
	texto: String,
	author: String
});

module.exports = mongoose.model("Post", postSchema);