'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Insects', [
    {
      name: 'Dwarf Lantern Shark',
      description: 'The smallest shark, the dwarf lantern shark, is rarely seen and little-known.',
      territory: 'The Caribbean Sea',
      fact: 'The dwarf lantern shark is the smallest shark in the world, reaching a maximum length of 8.3 inches.',
      millimeters: 210
    },{
      name: 'Bee Hummingbird',
      description: 'The bee hummingbird, zunzuncito or Helena hummingbird, is a species of hummingbird which is the world\'s smallest bird.',
      territory: 'Cuba',
      fact: 'The bee hummingbird is the smallest bird in the world with a length of just 2.25 inches.',
      millimeters: 57
    },{
      name: 'Paedocypris progenetica',
      description:  'Paedocypris progenetica is a species of cyprinid fish endemic to Indonesia where it occurs in peat swamps and blackwater streams on the Southeast Asian islands of Sumatra and Bintan.',
      territory: 'Indonesia',
      fact: 'Paedocypris progenetica is the smallest fish in the world, reaching a maximum length of 0.31 inches.',
      millimeters: 8
    }
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      await queryInterface.bulkDelete('Insects', {
        name: [ 'Dwarf Lantern Shark', 'Bee Hummingbird', 'Paedocypris progenetica']
      });
  }
};
