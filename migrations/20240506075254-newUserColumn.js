'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.addColumn('Users', 'confirmed', {
			type: Sequelize.BOOLEAN,
		});
	},

	async down(queryInterface, Sequelize) {},
};