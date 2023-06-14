'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(
      'Colors',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING(20),
          allowNull:false,
          unique:true
        },
        createdAt:Sequelize.literal("CURRENT_TIMESTAMP"),
        updatedAt:Sequelize.literal("CUREENT_TIMESTAMP")

  });

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
      await queryInterface.dropTable('Colors');
  }
}
};
