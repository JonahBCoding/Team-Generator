const Employee = require('./Employees.js');

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.role = 'Engineer';
        this.github = github;
    }
    getGitHub () {
        return this.github;
    }

    getRole() {
        return this.role
    }
}

module.exports = Engineer;