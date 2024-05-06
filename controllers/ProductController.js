const { Product, Category, ProductCategory, Sequelize, Review } = require('../models/index');
const { Op } = Sequelize;
const path = require('path');

const ProductController = {
	async addProduct(req, res, next) {
		try {
			if (req.file) req.body.img = req.file.filename;
			const product = await Product.create(req.body);
			product.addCategory(req.body.CategoryId);
			res.status(201).send({ msg: 'Product was created', product: product });
		} catch (error) {
			console.error(error);
			next(error);
		}
	},
	async updateProduct(req, res) {
		try {
			if (req.file) req.body.img = req.file.filename;
			await Product.update(...req.body, {
				where: {
					id: req.params.id,
				},
			});
			const product = await Product.findByPk(req.params.id);
			product.setCategories(req.body.CategoryId);
			res.send({ msg: 'Product was updated' });
		} catch (error) {
			console.error(error);
			next(error);
		}
	},
	async deleteProductById(req, res) {
		try {
			await Product.destroy({ where: { id: req.params.id } });
			await ProductCategory.destroy({ where: { ProductId: req.params.id } });
			res.send({ msg: 'Product was deleted.' });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async getAll(req, res) {
		try {
			const products = await Product.findAll({
				include: [
					{ model: Category, attributes: ['category'], through: { attributes: [] } },
					{ model: Review, attributes: ['content'] },
				],
			});
			res.send({ msg: 'All products with their categories: ', products });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async getProductById(req, res) {
		try {
			const product = await Product.findOne({
				where: { id: req.params.id },
				include: [
					{ model: Category, attributes: ['category'], through: { attributes: [] } },
					{ model: Review, attributes: ['content'] },
				],
			});
			res.send({ msg: 'Product finded: ', product });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async getProductByName(req, res) {
		try {
			const product = await Product.findAll({
				where: {
					name: {
						[Op.like]: `%${req.params.name}%`,
					},
				},
				include: [
					{ model: Category, attributes: ['category'], through: { attributes: [] } },
					{ model: Review, attributes: ['content'] },
				],
			});
			res.send({ msg: `Products whit name = ${req.params.name} finded.`, product });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async getProductsByPrice(req, res) {
		try {
			const products = await Product.findAll({
				where: {
					price: {
						[Op.like]: req.params.price,
					},
				},
			});
			res.send({ msg: `Products with price ${req.params.price} finded`, products });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async productsDescByPrice(req, res) {
		try {
			const products = await Product.findAll({
				include: [
					{ model: Category, attributes: ['category'], through: { attributes: [] } },
					{ model: Review, attributes: ['content'] },
				],
				order: [['price', 'DESC']],
			});
			res.send({ msg: `Products ordered in descending order`, products });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async productsAscByPrice(req, res) {
		try {
			const products = await Product.findAll({
				include: [
					{ model: Category, attributes: ['category'], through: { attributes: [] } },
					{ model: Review, attributes: ['content'] },
				],
				order: [['price', 'ASC']],
			});
			res.send({ msg: `Products ordered in descending order`, products });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async serveProductImage(req, res) {
		try {
			const imageName = req.params.imageName;
			const imagePath = path.join(__dirname, '../public/images/user/products', imageName);
			res.sendFile(imagePath);
		} catch (error) {
			res.status(500).send({ message: 'Error serving product image', error });
		}
	},
};

module.exports = ProductController;
