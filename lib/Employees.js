class Employee {
    constructor(name, id, email) {
        this.id = id;
        this.name = name;
        this.role = Employee;
        this.email = email;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getRole () {
        return this.role;
    }

    getEmail () {
        return this.email
    }
}

module.exports = Employee;