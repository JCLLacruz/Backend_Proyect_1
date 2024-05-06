const { User, Product, Token, Sequelize } = require('../models/index.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development'];
const { Op } = Sequelize;
const transporter = require('../config/nodemailer.js');
const PORT = require('../index.js');

const UserController = {
	async singUp(req, res, next) {
		try {
			const role = (req.body.role = 'user');
			const password = bcrypt.hashSync(req.body.password, 10);
			const time = Date.now();
			const today = new Date(time);
			const user = User.create({
				...req.body,
				created_at: today,
				password,
				role,
				confirmed: false,
			});
			const emailToken = jwt.sign({ email: req.body.email }, jwt_secret, { expiresIn: '48h' });
			const url = 'https://localhost:' + PORT + 'users/confirm/' + emailToken;
			await transporter.sendMail({
				to: req.body.email,
				subject: 'Please confirm your email.',
				html: `<h3> Welcome to PokeShop, only one step more to enjoy!</h3>
				<a href="${url}">Click to confirm your email</a>`,
			});
			res.status(201).send({ msg: 'Email to confirm user sended', user });
		} catch (error) {
			console.error(error);
			next(error);
		}
	},
	async confirmUser(req, res) {
		try {
			const emailToken = req.params.emailToken;
			const payload = jwt.verify(emailToken, jwt_secret);
			await User.update(
				{ confirmed: true },
				{
					where: { email: payload.emailToken },
				}
			);
			res.status(201).send({ msg: 'User email was confirmed' });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async singIn(req, res, next) {
		try {
			const user = await User.findOne({ where: { email: req.body.email } });
			if (!user) {
				return res.status(400).send({ msg: 'User or password incorrect.' });
			}
			if (!user.confirmed) {
				return res.status(400).send({ msg: 'User not confirmed.' });
			}
			const isMatch = bcrypt.compareSync(req.body.password, user.password);
			if (!isMatch) {
				return res.status(400).send({ msg: 'User or password incorrect.' });
			}
			const token = jwt.sign({ id: user.id }, jwt_secret);
			await Token.create({ token, UserId: user.id });
			res.send({ msg: `Welcome ${user.name}`, user, token });
		} catch (error) {
			console.error(error);
			next(error);
		}
	},
	async getOneOnline(req, res) {
		try {
			const user = await User.findOne({
				where: { id: req.params.id },
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
			await User.destroy({ where: { id: req.params.id } });
			res.send({ msg: 'User deleted successfully.' });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async updateById(req, res) {
		try {
			await User.update(req.body, {
				where: {
					id: req.params.id,
				},
			});
			const user = await User.findByPk(req.params.id);
			user.setCategories(req.body.CategoryId);
			res.send({ msg: 'USer was updated', user });
		} catch (error) {
			console.error(error);
			next(error);
		}
	},
	async logout(req, res) {
		console.log(req);
		try {
			await Token.destroy({
				where: {
					[Op.and]: [{ UserId: req.user.id }, { token: req.headers.authorization }],
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
