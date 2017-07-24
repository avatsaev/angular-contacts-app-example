var faker = require('faker');

module.exports = function () {
    const data = {contacts: []};
    // Create 10 contacts
    for (var i = 0; i < 10; i++) {
        data.contacts.push({
            id: i, name: faker.name.findName(),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber()
        })
    }
    return data
};
