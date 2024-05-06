const { where } = require('sequelize');
const { Product, User, Category, Review } = require('../models/index');

const ReviewController = {
	async getAll(req, res) {
		try {
			const reviews = await Review.findAll({
				include: [
					{ model: Product, attributes: ['id'] },
					{ model: User, attributes: ['id'] },
				],
			});
			res.send({ msg: 'All reviews', reviews });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async addReview(req, res, next) {
		try {
			const review = await Review.create({ ...req.body, UserId: req.user.id });
			res.status(201).send({ msg: 'Review was created', review });
		} catch (error) {
			console.error(error);
			next(error);
		}
	},
	async updateReview(req, res, next) {
		try {
			await Review.update(req.body, {
				where: {
					id: req.params.id,
				},
			});
			res.send({ msg: 'Review was updated' });
		} catch (error) {
			console.error(error);
			next(error);
		}
	},
	async deleteReview(req, res) {
		try {
			await Review.destroy({ where: { id: req.params.id } });
			res.send({ msg: 'Review was deleted.' });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
};

module.exports = ReviewController;
