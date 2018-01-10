var mongoose = require("mongoose");
var Post = require("./models/post");

var data = [
	{
		title: "Valentines day",
		texto: "A black winter care away",
		author: "Chester Benningtion"
	}, 
	{
		title: "In the End",
		texto: "I tried so hard and got so far, but in the end, it doesnt even matter",
		author: "Mike Shinoda"
	},
	{
		title: "little things give you away",
		texto: "All you ever wanted, so wanna truly look up to you",
		author: "Chester Benningtion"
	},
	{
		title: "Adventure of the life time",
		texto: "monitos  monitos y mas monitos seee",
		author: "Coldplay"
	}
];

function seedDB() {
	Post.remove({}, function(err){
		if(err) {
			console.log(err);
		} else {
			console.log("Remove Posts");
			data.forEach(function(seed){
				Post.create(seed, function(err, newPost){
					if(err) {
						console.log(err);
					} else {
						console.log("Nuevo post creado");
					}
				});
			});
		}
	});
}

module.exports = seedDB;