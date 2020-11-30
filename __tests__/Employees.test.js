const Employee = require('../lib/Employees');

test("Can create a new Employee", () => {
    const employee = new Employee ('Jonah')
    expect(employee.name).toBe('Jonah')
}) 