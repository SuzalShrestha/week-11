'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.renameColumn('games', 'numPlayers', 'maxPlayers');
    await queryInterface.removeColumn('games', 'estPlayTime');
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.renameColumn('games', 'maxPlayers', 'numPlayers');
    await queryInterface.addColumn('games', 'estPlayTime', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};
