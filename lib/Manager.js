const Employee = require('./Employees')

class Manager extends Employee {
    constructor(name, id, email, officePhone) {
        super(name, id, email)
        this.title = 'Manager';
        this.officePhone = officePhone;
    }

    getRole () {
        return this.title;
    }

    getOfficePhone () {
        return this.officePhone;
    }
    
}

module.exports = Manager;