const Employee = require('./Employees')

class Manager extends Employee {
    constructor(name, id, email, officePhone) {
        super(name, id, email)
        this.role = 'Manager';
        this.officePhone = officePhone;
    }

    getRole () {
        return this.role;
    }

    getOfficePhone () {
        return this.officePhone;
    }
    
}

module.exports = Manager;