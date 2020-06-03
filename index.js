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
                //default: "vanessabau"
            },
            {
                name: "title",
                message: "Please enter your Project Title"
            },
            {
                name: "description",
                message: "Please enter a short description of your project that includes the motivation to build the project:  "
            },
            {
                name: "installation",
                message: "What are the project installation steps?"
            },
            {
                name: "useage",
                message: "How should your project be used?"
            }, 
            {
                name: "license",
                message: "Indicate project license(s):"
            },
            {
                name: "contributors",
                message: "List any contributors: "
            },
            {
                name: "tests",
                message: "Explain how to run testing: "
            }     
        ])
        .then(function({ username, title, description, installation, useage, license, contributors, tests  }) {
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
## CREATED BY GITHUB USER: ${username}
GITHUB PROFILE PHOTO: [${username}](${profilePic})
GITHUB EMAIL: ${email}
## TABLE OF CONTENTS
1. [Description](#Description)
2. [Installation](#Installation)
3. [Useage](#Useage)
4. [Licensing](#Licensing)
5. [Contributors](#Contributors)
6. [Tests](#Tests)
7. [Questions](#Questions)

## CONTENT
# Description: ${description}
2. **Installation:** ${installation}
3. **Useage:** ${useage}
4. **Licensing:** ${license}
5. **Contributors:** ${contributors}
6. **How to Test:** ${tests}
7. **Questions:** 

**BADGE:** [made-for-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)`

            //Write readMe to .md file
            fs.writeFile("README.md", readMe, function(err) {
                if (err) {
                throw err;
                }
                console.log(`Readme successfully written`);
            });
            });
        });
