const request = require('supertest');
const app = require('../index.js');
const {User} = require('../models/index.js');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development'];


describe('testing/users', () => {
    afterAll(()=> {
        return User.destroy({where: {role: 'user'}, truncate: true});
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
        .send({email: user.email, password: user.password})
        .expect(200)
        expect(res.body.msg).toBe(`Welcome ${user.name}`);
        token = res.body.token;
    });

    test('getOneOnline', async ()=> {
        const res = await request(app)
        .get(`/users/getoneonline/1`)
        .expect(200)
        .set({authorization: token});
        expect(res.body.msg).toBe('User is online');
    })
});
