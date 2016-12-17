var fs = require("fs");

function ClozeFlashcard (username, type, front, back) { 
	this.username = username,
	this.type = type,
	this.front = front,
	this.back = back,
	this.addCard = function(){

		fs.appendFile("newUser.txt", userInfo, function(err){
			if(err){
				return console.log("Error! Something went wrong!");
			}
			console.log(userInfo);
		});
	}
}
module.exports = ClozeFlashcard; 
