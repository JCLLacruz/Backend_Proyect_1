const { User, Product } = require('../models/index');
const bcrypt = require('bcryptjs');

const UserController = {
	async singUp(req, res) {
		try {
			const role = (req.body.role = 'user');
			const password = bcrypt.hashSync(req.body.password, 10);
			const user = User.create({
				...req.body,
				password,
				role,
			});
			res.status(201).send({ msg: 'User was created', user });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async singIn(req, res) {
        try {
            const user = User.findOne({ where: { email: req.params.email } });
            if (!user) {
                return res.status(400).send({msg:'User or password incorrect.'});
            };
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if(!isMatch){
                return res.status(400).send({msg:'User or password incorrect.'});
            }
            res.send(user);
        } catch (error) {
            console.error(error);
			res.status(500).send(error); 
        }
	},
};

module.exports = UserController;
