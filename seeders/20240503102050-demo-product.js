'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Products', [
			{
				name: 'Charizard',
				description:
					'Charizard is a large dragon-like Pokémon, mainly orange in color. It has two large wings, the underside of which are turquoise. Like Charmander and Charmeleon, it has a flame at the end of its tail.',
				img: 'https://img.pokemondb.net/artwork/large/charizard.jpg',
				price: 500000,
				stock: 1,
				WarehouseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
			},
			{
				name: 'Magicarp',
				description: 'Magikarp is a small, fish-like Pokémon. It is primarily reddish orange in color, but has yellow fins and whiskers.',
				img: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/129.png',
				price: 10,
				stock: 300,
				WarehouseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
			},
      {
				name: 'Pikachu',
				description: 'Pikachu are small, and cute mouse-like Pokémon. They are almost completely covered by yellow fur.',
				img: 'https://img.pokemondb.net/artwork/large/pikachu.jpg',
				price: 10000000,
				stock: 30,
				WarehouseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
			},
      {
				name: 'Porygon',
				description: 'Porygon is a virtual Pokémon. It is based on early 3D animation models, and is thus created completely out of polygons.',
				img: 'https://static.wikia.nocookie.net/pokemon/images/6/6b/137Porygon.png/revision/latest?cb=20140328210734',
				price: 50000,
				stock: 30,
				WarehouseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
			},
      {
				name: 'Slugma',
				description: `Slugma does not have any blood in its body. Instead, intensely hot magma circulates throughout this Pokémon's body, carrying essential nutrients and oxygen to its organs.`,
				img: 'https://static.wikia.nocookie.net/pokemon/images/6/6b/137Porygon.png/revision/latest?cb=20140328210734',
				price: 50000,
				stock: 30,
				WarehouseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
	},
};
