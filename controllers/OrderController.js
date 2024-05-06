const { where } = require('sequelize');
const { Product, User, Category, Order, ProductOrder } = require('../models/index');

const OrderController = {
	async getAll(req, res) {
		try {
			const orders = await Order.findAll({
				include: [{ model: Product, attributes: ['id','name'], through: { attributes: [] } }],
			});
			res.send({msg: `All orders`, orders});
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async addOrder(req, res) {
		try {
			const time = Date.now();
            const today = new Date(time);
            const order = await Order.create({...req.body,date: today,status: "ordered", UserId: req.user.id});
            order.addProduct(req.body.ProductId);
            res.status(201).send({ msg: 'Order was created', order});
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
};

module.exports = OrderController;
