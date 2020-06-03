const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");


//Prompt user for github username
inquirer
    .prompt([
            {
                name: "username",
                message: "Enter your GitHub username:",
                default: "vanessabau"
            },
            {
                name: "title",
                message: "Please enter your Project Title",
                default: "Readme-Generator"
            },
            {
                name: "description",
                message: "Please enter a brief description of your project: ",
                default: "Automated template that produces an organized and formatted readme.md file"
            },
            {
                name: "installation",
                message: "What are the project installation steps?",
                default: "To use run 'npm install' from terminal on to add dependencies."
            },
            {
                name: "useage",
                message: "How should your project be used?",
                default: "This is a CLI application to be used from the terminal. Once dependencies are installed open terminal and run 'node index' then follow the prompts."
            }, 
            {
                name: "license",
                message: "Indicate project license(s):",
                default: "None"
            },
            {
                name: "contributors",
                message: "List any contributors: ",
                default: "None"
            },
            {
                name: "tests",
                message: "Explain how to run testing: ", 
                default: "Currently no tests are available."
            }, 
            {
                name: "questions",
                message: "Remaining questions: ",
                default: "None"
            }         
        ])
        .then(function({ username, title, description, installation, useage, license, contributors, tests, questions  }) {
            //create query url
            const queryUrl = `https://api.github.com/users/${username}`;

            //with query url create axios call
            axios
            .get(queryUrl)
            .then(function(res) {
            //store github email and profile pic in variables
            const email = res.data.email;
            const profilePic = res.data.avatar_url;

            //Format README file contents
            let readMe = 
`# README ${title}
${description}
# ![made-for-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)
## GITHUB USER: ${username}
## GITHUB EMAIL: ${email}
# ![${username}](${profilePic})
## Click video link below to watch demo
# [![Watch the video](https://raw.githubusercontent.com/vanessabau/ReadMe-generator/master/Screen%20Shot%202020-06-03%20at%2011.41.56%20AM.png)](https://www.youtube.com/watch?v=2qkHq4gDnE4)
## TABLE OF CONTENTS
1. [Installation](###Installation)
2. [Useage](###Useage)
3. [Licensing](###Licensing)
4. [Contributors](###Contributors)
5. [Tests](###Testing)
6. [Questions](###Questions)

## CONTENT
### Installation
${installation}
### Useage
${useage}
### Licensing
${license}
### Contributors
${contributors}
### Testing
${tests}
### Questions
${questions}
`

            //Write readMe to .md file
            fs.writeFile("README.md", readMe, function(err) {
                if (err) {
                throw err;
                }
                console.log(`Readme successfully written`);
            });
            });
        });
