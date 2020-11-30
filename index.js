const inquirer = require('inquirer');
const fs = require('fs');

const Employee = require('./lib/Employees')
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');

const teamMembers = [];
const teamName = [];


function initApp() {
    startHtml();
    addTeamName();
}

function addTeamName() {
    inquirer.prompt([
        {
            message: "What is your team name?",
            name: "teamname"
        }
    ])
        .then(function (data) {
            const teamname = data.teamname
            teamName.push(teamname)
            addManager();
        })
}

function addManager() {
    inquirer.prompt([
        {
            name: "name",
            message: "What is your team managers name?"
        },
        {
            name: "email",
            message: "What is your team managers email address?"
        },
        {
            type: "number",
            name: "officePhone",
            message: "What is your team managers office phone number?"
        }
    ])
        .then(function (data) {
            const name = data.name
            const id = teamMembers.length + 1
            const email = data.email
            const officePhone = data.officePhone
            const teamMember = new Manager(name, id, email, officePhone)
            teamMembers.push(teamMember)
            addTeamMember();

        })
}

function addTeamMember() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to add another team member?",
            choices: ["Engineer", "Intern", "No"],
            name: "newMemberData"
        }
    ])

        .then(function (data) {
            if (data.newMemberData === "Engineer") {
                addEngineer();
            } else if (data.newMemberData === "Intern") {
                addIntern();
            } else {
                finishHtml();
            }
        })
}

function addEngineer() {
    inquirer.prompt([
        {
            message: "What is the engineer's name?",
            name: "name"
        },
        {
            message: "What is the engineer's email?",
            name: "email"
        },
        {
            message: "What is the engineer's GitHub profile?",
            name: "github"
        }
    ])

        .then(function (data) {
            const name = data.name
            const id = teamMembers.length + 1
            const email = data.email
            const github = data.github
            const teamMember = new Engineer(name, id, email, github)
            teamMembers.push(teamMember)

            addTeamMember();
        })
}

function addIntern() {
    inquirer.prompt([
        {
            message: "What is the interns name?",
            name: "name"
        },
        {
            message: "What is the Interns email?",
            name: "email"
        },
        {
            message: "What school does the intern attend?",
            name: "school"
        }
    ])
        .then(function (data) {
            const name = data.name
            const id = teamMembers.length + 1
            const email = data.email
            const school = data.school
            const teamMember = new Intern(name, id, email, school)
            teamMembers.push(teamMember)

            addTeamMember();
        })
}

function startHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profileeee</span>
        </nav>
        <div class="container">
            <div class="row">`;
    fs.writeFile("index.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
    
}

function renderTeam() {
    var managerArray = teamMembers.filter(employee => {
        if (employee.role === 'Manager') {
            const html = `<div class="container">
            <div class="card mx-auto w-50">
                <h3 class="card-header">${managerArray[0].name}<br /><br />${managerArray[0].role}</h3>
                <ul class="list-group">
                    <li class="list-group-item">ID: ${managerArray[0].id}</li>
                    <li class="list-group-item">Email: ${managerArray[0].email}</li>
                    <li class="list-group-item">Office Phone: ${managerArray[0].officePhone}</li>
                </ul>
            </div>
        </div>`
        }
        fs.appendFile("index.html", html, function (err) {
            if (err) {
                console.log(err)
            }
        })
    })
}

function finishHtml() {
    const html = ` </div>
    </div>
    
</body>
</html>`;

    renderTeam();

    fs.appendFile("index.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("end");
}


initApp();