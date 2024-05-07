const request = require('supertest');
const app = require('../index.js');
const { User, Category, Product, Order, Review } = require('../models/index.js');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development'];

describe('testing/users', () => {
	afterAll(async () => {
		return {
			user: await User.destroy({ where: { role: 'user' } }),
			products: await Product.destroy({ where: { id: 1 } }),
			category: await Category.destroy({ where: { id: 1 } }),
			order: await Order.destroy({ where: { id: 1 } }),
			review: await Review.destroy({ where: { id: 1 } }),
		};
	});

	//UserController Test

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

	test('confirmUser', async () => {
		const emailToken = jwt.sign({ email: user.email }, jwt_secret, { expiresIn: '48h' });
		const res = await request(app).get(`/users/confirm/${emailToken}`).expect(201);
		expect(res.body.msg).toBe('User email was confirmed');
	});

	let token;
	test('signIn', async () => {
		const res = await request(app).post('/users/signin').send({ email: 'pepe@gmail.com', password: 'holiholi' }).expect(200);
		expect(res.body.msg).toBe(`Welcome Pepe`);
		token = res.body.token;
	});

	test('getOneOnline', async () => {
		const res = await request(app).get(`/users/getoneonline/1`).expect(200).set({ authorization: token });
		expect(res.body.msg).toBe('User is online');
	});

	test('deleteById', async () => {
		const res = await request(app).delete('/users/id/1').expect(200).set({ authorization: token });
		expect(res.body.msg).toBe('User deleted successfully.');
	});

	test('updateById', async () => {
		const userUpdated = { name: 'Jose', address: 'Calle Jamaica,12' };
		const res = await request(app).put('/users/1').expect(200).send(userUpdated).set({ authorization: token });
		expect(res.body.msg).toBe('User was updated');
	});

	//CategoryController Test

	const category = {
		category: 'plant',
		description: 'plant',
	};

	test('addCategory', async () => {
		const res = await request(app).post('/categories/').send(category).set({ authorization: token }).expect(201);
		const sendCategory = {
			...category,
			id: res.body.category.id,
			createdAt: res.body.category.createdAt,
			updatedAt: res.body.category.updatedAt,
		};
		const newCategory = res.body.category;
		expect(newCategory).toEqual(sendCategory);
	});

	test('updateCategory', async () => {
		const updateCategory = { category: 'Flying', description: 'Flying' };
		const res = await request(app).put(`/categories/update/1`).send(updateCategory).set({ authorization: token }).expect(200);
		expect(res.body.msg).toBe('Category was updated');
	});

	test('getAll', async () => {
		const res = await request(app).get('/categories/');
		expect(res.body.msg).toBe('All categories with our products: ');
	});

	test('getOneById', async () => {
		const res = await request(app).get('/categories/id/1');
		expect(res.body.msg).toBe(`Category with id: 1 is: Flying`);
	});

	test('getByName', async () => {
		const res = await request(app).get('/categories/name/Flying');
		expect(res.body.msg).toBe('Category Flying was finded');
	});

	//ProductController Test
	const product = {
		name: 'PokeTest',
		description: 'Magikarp is a small, fish-like Pokémon. It is primarily reddish orange in color, but has yellow fins and whiskers.',
		price: 10,
		stock: 300,
		WarehouseId: 1,
	};

	test('addProduct', async () => {
		const res = await request(app).post('/products/').send(product).set({ authorization: token }).expect(201);
		const sendProduct = {
			...product,
			id: res.body.product.id,
			imageURL: res.body.product.imageURL,
			createdAt: res.body.product.createdAt,
			updatedAt: res.body.product.updatedAt,
		};
		const newProduct = res.body.product;
		expect(newProduct).toEqual(sendProduct);
	});

	test('getAll', async () => {
		const res = await request(app).get('/products/');
		expect(res.body.msg).toBe('All products with their categories: ');
	});

	test('getProductById', async () => {
		const res = await request(app).get('/products/id/1');
		expect(res.body.msg).toBe('Product finded: ');
	});

	test('getProductByName', async () => {
		const res = await request(app).get('/products/name/PokeTest');
		expect(res.body.msg).toBe('Products whit name = PokeTest finded.');
	});

	test('getProductsByPrice', async () => {
		const res = await request(app).get('/products/price/10');
		expect(res.body.msg).toBe('Products with price 10 finded');
	});

	test('updateProduct', async () => {
		const updateProduct = { name: 'updatepoketest', description: 'updatepoketest' };
		const res = await request(app).put('/products/1').send(updateProduct).set({ authorization: token }).expect(200);
		expect(res.body.msg).toBe('Product was updated');
	});

	test('productsAscByPrice', async () => {
		const res = await request(app).get('/products/ascprice');
		expect(res.body.msg).toBe('Products ordered by price ascending');
	});

	test('productsDescByPrice', async () => {
		const res = await request(app).get('/products/descprice');
		expect(res.body.msg).toBe('Products ordered by price descending');
	});

	//OrderController Test

	test('addOrder', async () => {
		const order = { UserId: 1, Status: 'sended' };
		const res = await request(app).post('/orders/').send(order).set({ authorization: token }).expect(201);
		expect(res.body.msg).toBe('Order was created');
	});

	test('getAll', async () => {
		const res = await request(app).get('/orders/');
		expect(res.body.msg).toBe('All orders');
	});

	//ReviewController Test

	test('addReview', async () => {
		const review = { UserId: 1, ProductId: 1, content: 'Great product' };
		const res = await request(app).post('/reviews/').send(review).set({ authorization: token }).expect(201);
		expect(res.body.msg).toBe('Review was created');
	});

	test('updateReview', async () => {
		const review = { content: 'Great product, I love it' };
		const res = await request(app).put('/reviews/id/1').send(review).set({ authorization: token }).expect(200);
		expect(res.body.msg).toBe('Review was updated');
	});

	test('getAll', async () => {
		const res = await request(app).get('/reviews/');
		expect(res.body.msg).toBe('All reviews');
	});

	//Last tests so that the previous ones work

	test('deleteReview', async () => {
		const res = await request(app).delete('/reviews/id/1').set({ authorization: token });
		expect(res.body.msg).toBe('Review was deleted.');
	});

	test('deleteProductById', async () => {
		const res = await request(app).delete('/products/id/1').set({ authorization: token });
		expect(res.body.msg).toBe('Product was deleted.');
	});

	test('deleteCategoryById', async () => {
		const res = await request(app).delete('/categories/id/1').set({ authorization: token });
		expect(res.body.msg).toBe('Category was deleted.');
	});

	test('logout', async () => {
		const res = await request(app).delete('/users/logout').expect(200).set({ authorization: token });
		expect(res.body.msg).toBe('Logout correctly');
	});
});
