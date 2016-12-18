var fs = require("fs");
var inquirer = require("inquirer");
var Cloze = require("./Cloze.js");
var Basic = require("./Basic.js");

//Start Application
inquirer.prompt([
	{
		name: "action",
		message: "What action do you want to take?",
		type: "list",
		choices: ["create", "review", "nothing"]
	}
	]).then(function(answers){
		switch (answers.action){
			case "create":
				console.log("You've chosen to: " + answers.action);
				create();
				break;
			case "review":	
				console.log("You've chosen to: " + answers.action);
				review();
				break;
			case "nothing":
				console.log("You've chosen to do: " + answers.action);
				console.log("Oh well, so much for studying!");
				break;
		}
});

//Action Functions
function create(){
	inquirer.prompt([
		{
			name: "card",
			message: "Which type of card do you want to create?",
			type: "list",
			choices: ["basic", "cloze"]
		}
		]).then(function(answers){
			switch (answers.card){
				case "basic":
					console.log("You chose to make: " + answers.card);
					makeBasic("basic");
					break;
				case "cloze":
					console.log("You chose to make: " + answers.card);
					makeCloze("cloze");
					break;
			} 
	});	
}
function review(){
	inquirer.prompt([
		{
			name: "user",
			message: "What is your name?",
			type: "input"
		},
		{
			name: "card",
			message: "Which card type do you want to review?",
			type: "list",
			choices: ["basic", "cloze"]
		}
		]).then(function(answers){

			fs.readFile("test.txt", "utf8", function(error, data){
				var obj = JSON.parse(data); //reading object
				var frontArray = [];

				for(var i = 0; i < obj.length; i++){
					if(answers.user === obj[i].user && answers.card === obj[i].type){//user chosen
						frontArray.push(obj[i].front); //Calling specific data from test.txt
					}
				}

				inquirer.prompt([
					{
						name: "check",
						message: "Pick which card you want to see the answer for:",
						type: "list",
						choices: frontArray
					}
					]).then(function(choice){
						fs.readFile("test.txt", "utf8", function(error, data){
							var obj = JSON.parse(data); //reading object

							for(var i = 0; i < obj.length; i++){
								if(answers.user === obj[i].user && answers.card === obj[i].type && choice.check === obj[i].front){//user chosen
									console.log("The answer is: " + obj[i].back); //Calling specific data from test.txt
								}
							}
						});
				});
			});		
	});		
}


//Functions for Making Flashcards
function makeBasic(cardType){
	inquirer.prompt([
		{
			name: "user",
			message: "What's your name?",
			type: "input"
		},
		{
			name: "front",
			message: "What do you want to write on the FRONT of the card?",
			type: "input"
		},
		{
			name: "back",
			message: "What do you want to write on the BACK of the card?",
			type: "input"	
		}
		]).then(function(answers){
			var user = answers.user;
			var type = cardType;
			var front = answers.front;
			var back = answers.back;
			
			var card = new Basic (user, type, front, back);

			fs.readFile("test.txt", "utf8", function(error, data){
				var obj = JSON.parse(data);
				obj.push(card);

				fs.writeFile("test.txt", JSON.stringify(obj), function(error){
					if(error){
						return console.log("Error!");
					}
				});
			});
	});
}

//INCOMPLETE BELOW, figure out a way to ask the user for a statement, and the part of the statement they want to hide.

function makeCloze(cardType){
	inquirer.prompt([
		{
			name: "user",
			message: "What's your name?",
			type: "input"
		},
		{
			name: "statement",
			message: "Write a factual statement.",
			type: "input"
		},
		{
			name: "subject",
			message: "What is the subject of that statement?",
			type: "input"	
		}
		]).then(function(answers){
			var user = answers.user;
			var type = cardType;
			var statement = answers.statement;
			var subject = answers.subject;

			clozeStatement = statement.replace(subject, "...");
			console.log(clozeStatement);
		
			var card = new Cloze (user, type, statement, clozeStatement);

			fs.readFile("test.txt", "utf8", function(error, data){
				var obj = JSON.parse(data);
				obj.push(card);

				fs.writeFile("test.txt", JSON.stringify(obj), function(error){
					if(error){
						return console.log("Error!");
					}
				});
			});
	});
}
