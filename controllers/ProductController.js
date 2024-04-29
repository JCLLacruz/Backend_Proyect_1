const { Product } = require('../models/index');

//Implementa validación a la hora de crear un producto para que se rellene todos los campos y si no se hace que devuelva un mensaje. Solo podrás crear, actualizar y eliminar productos si estás autenticado.

const ProductController = {
	//atributtes: name, description, img, price
	async addProduct(req, res) {
		try {
			const product = await Product.create(req.body);
			res.status(201).send({ msg: 'Product was created', product: product });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async updateProduct(req, res) {
		try {
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async deleteProduct(req, res) {
		try {
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async findAllProducts(req, res) {
		//whit categories
		try {
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async findProductById(req, res) {
		//By Id
		try {
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async findProductByName(req, res) {
		//By Name
		try {
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async findProductByPrice(req, res) {
		//By Price
		try {
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async productsDescByPrice(req, res) {
		//Order products descending by price
		try {
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
};

module.exports = ProductController;