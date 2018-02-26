var mongoose = require("mongoose");
//borrar todas las colecciones
//poner tipos de usuario
var UserSchema = new mongoose.Schema({
	email: {type: String, 
		required: true, 
		unique: true,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	},
	user_type: {type: String, enum: ["Normal", "Admin"], default: "Normal"},
	created_at: { type: Date, default: Date.now },
    username: {type: String, 
    			required: true},
    password: {type: String,
    			required: true}
});

module.exports = mongoose.model("User", UserSchema);