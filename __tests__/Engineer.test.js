const Engineer = require('../lib/Engineer');

test("Can create new Engineer", () => {
    const engineer = new Engineer ('Jonah', 2, 'test@email.com')
    expect(engineer.name).toBe('Jonah')
})