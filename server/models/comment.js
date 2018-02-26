const mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
	text: String,
	created_at: { type: Date, default: Date.now },
	postId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post"
	},
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
});

module.exports = mongoose.model("Comment", commentSchema);