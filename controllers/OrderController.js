const { where } = require('sequelize');
const { Product, User, Category, Order, ProductOrder } = require('../models/index');

const OrderController = {
	async getAll(req, res) {
		try {
			const orders = await Order.findAll({
				include: [Product],
			});
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async addOrder(req, res) {
		try {
            const order = await Order.create(req.body);
            order.addUser(req.body.UserId);
            order.setProducts(req.body.ProductId);
            res.status(201).send({ msg: 'Order was created', order});
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
};

module.exports = OrderController;
