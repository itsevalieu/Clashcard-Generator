var inquirer = require("inquirer");

inquirer.prompt([
	{
		name: "name",
		message: "What's your name?"
	},
	{
		name: "action",
		message: "What would you like to do with the flashcards?",
		type: "list",
		choices: [
			"create",
			"review"
		]
	}
	]).then(function(answers){
		console.log("Your name is: " + answers.name);
		console.log("Action: " + answers.action);
		
		if(answers.action === "create"){
			console.log("Going to create either a basic or cloze flashcard.");
		}
});