const { Product, Category, Sequelize } = require('../models/index');
const { Op } = Sequelize;

//Implementa validación a la hora de crear un producto para que se rellene todos los campos y si no se hace que devuelva un mensaje. Solo podrás crear, actualizar y eliminar productos si estás autenticado.

const ProductController = {
	//atributtes: name, description, img, price, stock, WarehouseId, CategoryId
	async addProduct(req, res) {
		try {
			const product = await Product.create(req.body);
			product.addCategory(req.body.CategoryId);
			res.status(201).send({ msg: 'Product was created', product: product });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async updateProduct(req, res) {
		try {
			const product = await Product.update(req.body, {
				where: {
					id: req.params.id,
				},
			});
			res.send({ msg: 'Product was updated', productToUpdate: req.body });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async deleteProductById(req, res) {
		try {
			const product = await Product.destroy({ where: { id: req.params.id } });
			res.send({ msg: 'Product was deleted.' });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async getAll(req, res) {
		try {
			const products = await Product.findAll({
				include: [Category],
			});
			res.send({ msg: 'All products with our categories: ', products });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async getProductById(req, res) {
		try {
			const product = await Product.findByPk(req.params.id);
			res.send({ msg: 'Product finded: ', product });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async getProductByName(req, res) {
		try {
			const product = await Product.findOne({
				where: {
					name: {
						[Op.like]: `%${req.params.name}%`,
					},
				},
			});
			res.send({ msg: `Products whit name = ${req.params.name} finded.` });
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
					{
					order: [['price','DESC']],
				},
			],
			});
			res.send({msg: `Products ordered in descending order`, products});
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
};

module.exports = ProductController;
