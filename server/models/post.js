var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
	title: {type: String, required: true},
	texto: {type: String },
	created_at: { type: Date, default: Date.now },
	categories: [{type: String, 
		enum: ["Tecnologia", "Salud", "Ninguna", "Cultura", "Miedo", "Amor", "Politica", "Geek", "Musica", "Deportes"], 
		default: ["Ninguna"]}],
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

/*
	tecnologia
	Geek
	salud
	Cultura
	Musica
	Deportes
	Miedo
	Politica
	Amor
*/