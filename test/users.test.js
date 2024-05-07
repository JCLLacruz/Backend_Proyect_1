const request = require('supertest');
const app = require('../index.js')

DESCRIBE('testing/users', () => {
    const user = {
        name: 'Jose',
        email: 'jose@gmail.com',
        birthdate: '1966-05-01',
        address: 'Calle Salamanca, 2',
        phone: 656656656,
        password: 'holiholi'
        role: 'user',
        confirmed: false
    }
})