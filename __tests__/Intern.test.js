const { TestScheduler } = require('jest')
const Intern = require('../lib/Intern.js')

test("Can create new Intern", () => {
    const intern = new Intern('Intern', 3, 'test@email.com')
    expect(intern.name).toBe('Intern')
}) 