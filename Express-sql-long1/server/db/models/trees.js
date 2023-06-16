'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Trees.init({
    tree: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Tree name cannot be empty'
        }
      }

    },
    location: DataTypes.STRING,
    heightFt: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate:{
        min: {
          args: [0],
          msg: 'Height must be a positive number'
        }
      }
    },
    groundCircumferenceFt: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate:{
        min: {
          args: [0],
          msg: 'Ground circumference must be a positive number'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Trees',
  });
  return Trees;
};