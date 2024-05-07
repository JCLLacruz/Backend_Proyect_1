const request = require('supertest');
const app = require('../index.js');
const {Category} = require('../models/index.js');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development'];

describe('testing/categories', () => {
    afterAll(()=> {
        return Category.destroy({where: {}, truncate: true});
    });
    const category = {
        category: 'fire',
        description: 'fire'
    };
    test('addCategory',async ()=>{
        const res = await request(app)
        .post('/categories/')
        .send(category)
        set({authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzE1MDgzMDAxfQ.5tJ1d6XEj8L73mvsxCQZJb8gZeBZmIOMaW6nTDsoOO4'})
        .expect(201)
        const sendCategory = {
            ...category,
            id: res.body.id,
            createdAt: res.body.user.createdAt,
			updatedAt: res.body.user.updatedAt,
        }
        const newCategory = res.body;
        expect(newCategory).toEqual(sendCategory);
    })
});