const { User, Product, Token, Sequelize } = require('../models/index.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')["development"];
const { Op } = Sequelize;

const UserController = {
	async singUp(req, res) {
		try {
			const role = (req.body.role = 'user');
            if (req.body.name == '' || req.body.email == '' || req.body.birthdate == '' || req.body.address == '' ||req.body.phone == '' || req.body.password == '') {
             return res.status(400).send({msg:'Please fill in all fields.'});  
            }
			const password = bcrypt.hashSync(req.body.password, 10);
            const time = Date.now();
            const today = new Date(time);
            const user = User.create({
				...req.body,
                created_at: today,
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
			const user = await User.findOne({ where: { email: req.body.email } });
			if (!user) {
				return res.status(400).send({ msg: 'User or password incorrect.' });
			}
			const isMatch = bcrypt.compareSync(req.body.password, user.password);
			if (!isMatch) {
				return res.status(400).send({ msg: 'User or password incorrect.' });
			}
			const token = jwt.sign({ id: user.id}, jwt_secret);
			await Token.create({ token, UserId: user.id });
			res.send({ msg: `Welcome ${user.name}`, user, token });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async getOneOnline(req, res) {
		try {
			const user = await User.findOne({
                where: {id: req.params.id},
				include: [{ model: Order }, { model: Product }],
			});
			res.send({ msg: 'User is online', user });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async deleteById(req, res) {
		try {
            const user = await Category.destroy({where: {id: req.params.id}});
			res.send({msg:'User was deleted.'})
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async updateById(req, res) {
		try {
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async logout(req, res) {
        console.log(req);
		try {
			await Token.destroy({
				where: {
					[Op.and]: [{ UserId: req.user.id }, { token: req.headers.authorization }]
				},
			});
			res.send({ msg: 'Logout correctly' });
		} catch (error) {
			console.error(error);
			res.status(500).send({ msg: 'Probleme with logout' });
		}
	},
};

module.exports = UserController;
