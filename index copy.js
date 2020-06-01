const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);


//Prompt user for information
function promptUser(){
    return inquirer
    .prompt([
        {
            type: "input",
            name: "username",
            message: "What is your Github user name?"
        },
        {
            type: "input",
            name: "projectTitle",
            message: "Please enter your Project Title"
        },
        {
            type: "input",
            name: "description",
            message: "Please enter a description of your project"
        }   
    ]);
}

//function generateReadme(fileName, data) {
function generateReadme(answers) {
    return `${answers.username} README \n Project Description: ${answers.description}`
}

//promise.then method in another syntax
async function init() {
    console.log("hi")
    try {
      //return result in variable answers
      const answers = await promptUser();
        console.log(answers);
       const text = generateReadme(answers);
  
      //write text content in readme.md file
      await writeFileAsync("Readme.md", text);
  
      console.log("Successfully wrote to Readme.md");
    } catch(err) {
      console.log(err);
    }
  }

init();

