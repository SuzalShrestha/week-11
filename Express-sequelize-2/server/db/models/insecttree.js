'use strict';
module.exports = (sequelize, DataTypes) => {
  const InsectTree = sequelize.define('InsectTree', {
    insectId: DataTypes.STRING,
    treeId: DataTypes.STRING
  }, {});
  InsectTree.associate = function(models) {
    // associations can be defined here
    InsectTree.belongsTo(models.Insect, {
      foreignKey: "insectId"
    });
    InsectTree.belongsTo(models.Tree, {
      foreignKey: "treeId"
    });
  };
  return InsectTree;
};