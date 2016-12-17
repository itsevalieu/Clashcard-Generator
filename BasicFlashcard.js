var fs = require("fs");

function BasicFlashcard (username, type, front, back) { 
	this.username = username,
	this.type = type,
	this.front = front,
	this.back = back,
	this.addCard = function(){
		var newCard = {
			name: this.username,
			type: this.type,
			front: this.front,
			back: this.back
		};
		fs.appendFile("flashcards.txt", newCard, function(err){
			if(err){
				return console.log("Error! Something went wrong!");
			}
			console.log("New card: " + newCard);
		});
	}
}
module.exports = BasicFlashcard; 

{
	username: Eva,
	type = basic,

}

var dog = new BasicFlashcard ("Eva", "basic", "What is a dog?", "An animal");

dog.addCard;
