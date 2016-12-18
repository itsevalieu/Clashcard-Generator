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

			fs.readFile("test.txt", "utf8", function(error, data){
				var obj = JSON.parse(data); //reading object
				obj.push(card);

				for(var i = 0; i < obj.length; i++){
					if(obj[i].user === "Matt"){//user chosen
						console.log("Object fronts:" + obj[i].front) //Calling specific data from test.txt
					}
				}											
				//console.log(card); 
				//console.log(card.front);
			});
}


//Functions Below
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

function makeCloze(cardType){
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
			
			var card = new Basic (user, type, front, back);d.back;

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
