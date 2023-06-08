'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Colors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Colors.init({
    name: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter a color'
      },
     //name attribute must be unique
      isUnique: function (value, next) {
        Colors.findOne({
            where: {
              name: value
            }
          })
          .then((color) => {
            if (color) {
              return next('Color already in use!');
            }
            next();
          })
          .catch((err) => {
            return next(err);
          });
      }
    }
  }, {
    sequelize,
    modelName: 'Colors',
  });
  return Colors;
};