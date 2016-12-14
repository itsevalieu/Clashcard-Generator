var inquirer = require("inquirer");
var fs = require("fs");

var BasicFlashcard = require("./BasicFlashcard.js");

inquirer.prompt([
	{
		name: "name",
		message: "What's your name?"
	}
]).then(function(answers){
	console.log("Your name is: " + answers.name);

	fs.readFile("username.txt", "utf8", function(error, data){
		if(error){
			return console.log("Error! Something went wrong!");
		}
		var users = data.split(","); //array of users
		console.log("Current Users: " + users);
		for(var i = 0; i < users.length; i++){ //ERROR: Keeps doing same action. 
			if(answers.name === users[i]){
				console.log("Match!");
			}
			if(answers.name !== users[i]){
				console.log("No Match!");
				fs.appendFile("username.txt", "," + answers.name, function(error, data){
					if(error){
						return console.log("Error! Something went wrong!");
					}
					console.log("New user added! Welcome " + answers.name);
				});
			}
		}
	});

/*
	for(var i = 0; i < username.length; i++){
		if(answers.name === "new"){
			var basic = {};
			var cloze = {};
			fs.writeFile(answers.name + ".txt", basic + cloze, function(error){
				if(!error){
					console.log("We successfully saved our favorite movies to the movies.txt file.");
				}
				return console.log(error);
			}
		}
	}
});
*/
	inquirer.prompt([
		{
			name: "action",
			message: "What would you like to do with the flashcards?",
			type: "list",
			choices: ["create", "review", "nothing"]
		}

	]).then(function(answers){
		//Run Action Options
		console.log("Action: " + answers.action);
		if(answers.action === "create"){
			console.log("Going to create either a basic or cloze flashcard.");
			inquirer.prompt([
				{
					name: "card",
					message: "What type of card will you create?",
					type: "list",
					choices: ["basic", "cloze"]
				}
			]).then(function(ans){
				console.log("Card Type: " + ans.card);
				if(ans.card === "basic"){
					console.log("Run basic."); //Import basicflashcard.js new function to create new objectcards
				}
				if(ans.card === "cloze"){
					console.log("Run cloze."); //Import clozeflashcard.js new function to create new objectcards
				}
			});

		} else if (answers.action === "review"){
			console.log("Going to review flashcards.");
			inquirer.prompt([
				{
					name: "card",
					message: "Which type of cards do you want to review?",
					type: "list",
					choices: ["basic", "cloze"]
				}
			]).then(function(ans){
				console.log("Review Card Type: " + ans.card);
				if(ans.card === "basic"){
					console.log("Read basic object."); //FS Import user's basicflashcard.txt new function to read/console objectcards
				}
				if(ans.card === "cloze"){
					console.log("Read cloze object."); //FS Import user's clozeflashcard.txt new function to read/console objectcards
				}
			});
		} else {
			console.log ("You've decided to do nothing. Welp, it's your grade!");
		}
	});
});