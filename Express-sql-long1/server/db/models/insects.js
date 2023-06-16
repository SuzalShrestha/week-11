'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Insects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Insects.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        //name attribute should be titled cased
        isTitleCase(value) {
          if (value !== value.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')) {
            throw new Error('Name must be title cased');
          }
        }
      }
    },
    description: DataTypes.STRING,
    territory: DataTypes.STRING,
    fact: {
      type: DataTypes.STRING,
      validate: {
        max: 240
      }
    },
    millimeters: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0
      }
    }
  }, {
    sequelize,
    modelName: 'Insects',
  });
  return Insects;
};