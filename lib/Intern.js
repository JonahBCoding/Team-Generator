const Employee = require('./Employees')

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.title = 'Intern';
        this.school = school;
    }

    getRole() {
        return this.title;
    }

    getSchool() {
        return this.school;
    }
}

module.exports = Intern;