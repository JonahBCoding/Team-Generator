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
        .then(function (member) {
            const name = member.name
            const id = teamMembers.length + 1
            const email = member.email
            const officePhone = member.officePhone
            const Employee = new Manager(name, id, email, officePhone)
            teamMembers.push(Employee)
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

        .then(function (member) {
            const name = member.name
            const id = teamMembers.length + 1
            const email = member.email
            const github = member.github
            const Employee = new Engineer(name, id, email, github)
            teamMembers.push(Employee)

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
        .then(function (member) {
            const name = member.name
            const id = teamMembers.length + 1
            const email = member.email
            const school = member.school
            const Employee = new Intern(name, id, email, school)
            teamMembers.push(Employee)

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
            <span class="navbar-brand mb-0 h1 w-100 text-center"></span>
        </nav>`;
    fs.writeFile("sample.html", html, function (err) {
        if (err) {
            console.log(err);
        }
    });

}

function renderEngineer() {
    var html = "";
    
    var engineersArray = teamMembers.filter(employee => {
        if (employee.role === 'Engineer') {
            return true;
        }
    }) 

    
    if (engineersArray) {
        html = `<div class="container">
        <div class="card mx-auto w-50">
            <h3 class="card-header">${engineersArray[0].name}<br /><br />${engineersArray[0].role}</h3>
            <ul class="list-group">
                <li class="list-group-item">ID: ${engineersArray[0].id}</li>
                <li class="list-group-item">Email: ${engineersArray[0].email}</li>
                <li class="list-group-item">GitHub: ${engineersArray[0].github}</li>
            </ul>
        </div>
    </div>`
    console.log(engineersArray)
    } else {
        console.log("no engineer to display")
    }

    fs.appendFile("sample.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
}

function renderIntern() {
    var html = "";
    var internsArray = teamMembers.filter(employee => {
        if (employee.role === 'Intern') {
            return true;
        }
    })
    if (internsArray) {
        html = `<div class="container">
        <div class="card mx-auto w-50">
            <h3 class="card-header">${internsArray[0].name}<br /><br />${internsArray[0].role}</h3>
            <ul class="list-group">
                <li class="list-group-item">ID: ${internsArray[0].id}</li>
                <li class="list-group-item">Email: ${internsArray[0].email}</li>
                <li class="list-group-item">School: ${internsArray[0].school}</li>
            </ul>
        </div>
    </div>`
    } else {
        console.log("no intern to display")
    }
    fs.appendFile("sample.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
}

function renderManager() {
    var html = "";
    var managerArray = teamMembers.filter(employee => {
        if (employee.role === 'Manager') {
            return true
        }
    })
    if (managerArray) {
        html = `<div class="container">
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
    fs.appendFile("sample.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
}


function renderTeam () {
    renderManager();
    renderEngineer();
    renderIntern();
    
}

function finishHtml() {
    renderTeam();
    const html = ` </div>
    </div>
    
</body>
</html>`;



    fs.appendFile("sample.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("end");
}


initApp();