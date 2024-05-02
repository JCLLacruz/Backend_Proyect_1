const { Product, Category } = require('../models/index');

const CategoryController = {
	//atributtes: category, description
	async addCategory(req, res) {
		try {
			const category = await Category.create(req.body);
			res.status(201).send({ msg: 'Category was created', category: category });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async updateCategory(req, res) {
		try {
			const category = await category.update(req.body, {
				where: {
				  id: req.params.id,
				}},)
				res.send({msg: 'Category was updated', categoryToUpdate: req.body});
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
	}
},
	async deleteCategoryById(req, res) {
		try {
			const category = await Category.destroy({where: {id: req.params.id}});
			res.send({msg:'Category was deleted.'})
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async getAll(req, res) {
        const categories = await Category.findAll({
            include: [Product]
        });
        res.send({msg:'All categories with our products: ', categories})
		try {
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
};

module.exports = CategoryController;
