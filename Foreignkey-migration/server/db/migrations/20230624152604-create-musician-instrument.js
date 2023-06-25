'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MusicianInstruments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MusicianId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Musicians',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      instrumentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Instruments',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MusicianInstruments');
  }
};