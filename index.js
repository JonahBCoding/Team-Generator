const inquirer = require('inquirer');
const fs = require('fs');

const Employee = require('./lib/Employees')
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');

const teamMembers = [];

function addTeamName() {
    inquirer.prompt([
        {
            message: "What is your team name?",
            name: "teamname"
        }
    ])
    .then(function(data) {
        const teamName = data.teamname
        teamMembers.push(teamname)
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
    .then(function(data) {
        const name = data.name
        const id = 1
        const email = data.email
        const officePhone = data.officePhone
        const teamMember = new Manager(name, id, email, officePhone)
        teamMembers.push(teamMember)
        addTeamMember();
    })
}

function addTeamMember () {
    inquirer.prompt([
        {
         type: "list",
         message: "Would you like to add another team member?",
         choices:  ["Engineer", "Intern", "No other team members"],
         name: "newMemberData"   
        }
    ])

    .then (function(data) {
        if (data.newMemberData === "Engineer") {
            addEngineer();
        } else if (data.newMemberData === "Intern") {
            addIntern();
        } else {
            renderTeam();
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

    .then (function (data) {
        const name = data.name
        const id = teamMembers.length + 1
        const email = data.email
        const github = data.github
        const teamMember = new Engineer(name, id, email, github)
        teamMembers.push(teamMember)
        addTeamMember();
    })
}

function addIntern () {
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
    .then (function(data) {
        const name = data.name
        const id = teamMembers.length + 1
        const email = data.email
        const school = data.school
        const teamMember = new Intern(name, id, email, school)
        teamMembers.push(teamMember)
        addTeamMember();
    })
}
