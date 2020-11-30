const Manager = require('../lib/Manager.js')

test("Fills Manager value", () => {
    
    const manager = new Manager ('Jonah', 1, 'test@email.com');
    expect(manager.name).toBe('Jonah');
    expect(manager.id).toBe(1);
});