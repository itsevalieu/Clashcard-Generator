var fs = require("fs");
var inquirer = require("inquirer");
var Cloze = require("./Cloze.js");
var Basic = require("./Basic.js");


//above good
inquirer.prompt([
	{
		name: "card",
		message: "Which type of card do you want to create?",
		type: "list",
		choices: ["basic", "cloze"]
	}
	]).then(function(answers){
		if(answers.card === "basic"){
			console.log("You chose: " + answers.card);
			inquirer.prompt([
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
					var front = answers.front;
					var back = answers.back;
					
					var test = new Basic (front, back);
					var text = 'Front' + test.front + '\nBack:' + test.back;

					fs.readFile("test.txt", "utf8", function(error, data){
						var obj = JSON.parse(data);
						obj.push(test);

						console.log(obj[0].front) //Calling specific data from test.txt
						
						fs.writeFile("test.txt", JSON.stringify(obj), function(error){
							if(error){
								return console.log("Error!");
							}
						});
					});
			});
		}

		if(answers.card === "cloze"){
			console.log("You chose: " + answers.card);

		}
});





// fs.readFile("test.txt", "utf8", function(error, data){
// 	if(error){
// 		return console.log("Error!");
// 	}
// 	console.log(data[0]);
// });

// console.log(test);
// console.log(test.front);
