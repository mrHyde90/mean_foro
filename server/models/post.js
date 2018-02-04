var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
	title: {type: String, required: true},
	texto: {type: String, },
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}]
});

module.exports = mongoose.model("Post", postSchema);