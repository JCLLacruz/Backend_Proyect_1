const request = require('supertest');
const app = require('../index.js');
const {User} = require('../models/index.js');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development'];


describe('testing/users', () => {
    afterAll(()=> {
        return User.destroy({where: {role: 'user'}});
    });
	const user = {
		name: 'Jose',
		email: '19lacruz88@gmail.com',
		address: 'Calle Salamanca, 2',
        birthdate: '1965-06-01',
		phone: 656656656,
		password: 'holiholi',
		role: 'user',
		confirmed: false,
	};

	test('signUp', async () => {
		const res = await request(app).post('/users/signup').send(user).expect(201);
		const sendUser = {
			...user,
            id: res.body.user.id,
            birthdate: res.body.user.birthdate,
			password: res.body.user.password,
			createdAt: res.body.user.createdAt,
			updatedAt: res.body.user.updatedAt,
		};
		const newUser = res.body.user;
		expect(newUser).toEqual(sendUser);
	});

    
    test('confirmUser', async()=>{
        const emailToken = jwt.sign({ email: user.email }, jwt_secret, { expiresIn: '48h' });
        const res = await request(app)
        .get(`/users/confirm/${emailToken}`)
        .expect(201);
        expect(res.body.msg).toBe('User email was confirmed');
    });
    
    let token;
    test('signIn', async()=>{
        const res = await request(app)
        .post('/users/signin')
        .send({email: 'pepe@gmail.com', password: 'holiholi'})
        .expect(200)
        expect(res.body.msg).toBe(`Welcome Pepe`);
        token = res.body.token;
    });

    test('getOneOnline', async ()=> {
        const res = await request(app)
        .get(`/users/getoneonline/1`)
        .expect(200)
        .set({authorization: token});
        expect(res.body.msg).toBe('User is online');
    });

    test('deleteById', async ()=> {
        const res = await request(app)
        .delete('/users/id/1')
        .expect(200)
        .set({authorization: token});
        expect(res.body.msg).toBe('User deleted successfully.');
    })

    test('updateById', async ()=> {
        const userUpdated = {name: 'Jose',address: 'Calle Jamaica,12'};
        const res = await request(app)
        .put('/users/1')
        .expect(200)
        .send(userUpdated)
        .set({authorization: token});
        expect(res.body.msg).toBe('User was updated');
    })

    test ('logout', async () => {
        const res = await request(app)
        .delete('/users/logout')
        .expect(200)
        .set({authorization: token})
        expect(res.body.msg).toBe('Logout correctly');
    })
});
