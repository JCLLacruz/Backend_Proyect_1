const request = require('supertest');
const app = require('../index.js')

DESCRIBE('testing/users', () => {
    const user = {
        name: 'Jose',
        email: 'jose@gmail.com',
        birthdate: '1966-05-01',
        address: 'Calle Salamanca, 2',
        phone: 656656656,
        password: 'holiholi',
        role: 'user',
        confirmed: false
    }
});

test ('SignUp', async () => {
    const res = await request(app)
    .post('/users')
    .expect(201)
    const sendUser = {
        ...user,
        password: res.body.user.password,
        createdAt: res.body.user.createdAt,
        updatedAt: res.body.user.updatedAt
    };
    const newUser = res.body.user;
    expect(newUser).toEqual(sendUser);
})