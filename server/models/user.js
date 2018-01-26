var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	email: {type: String, 
		required: true, 
		unique: true,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	},
    username: {type: String, required: true},
    password: {type: String, required: true}
});

module.exports = mongoose.model("User", UserSchema);