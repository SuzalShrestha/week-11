'use strict';
const {Tree, Insect,InsectTree} = require("../models");
const {Op} = require("sequelize");
const insectTreesData=[
  {
    treeName:"General Sherman",
    insectName:"Western Pygmy Blue Butterfly"
  },
  {
    treeName:"General Grant",
    insectName:"Western Pygmy Blue Butterfly"
  },
  {
    treeName:"Lincoln",
    insectName:"Western Pygmy Blue Butterfly"
  },
  {
    treeName:"Stagg",
    insectName:"Western Pygmy Blue Butterfly"
  },
  {
    treeName:"Stagg",
    insectName:"Patu Digua Spider"
  }
];

module.exports = {
   up:async(queryInterface, Sequelize)=> {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      for(let i=0;i<insectTreesData.length;i++){
        const{treeName,insectName}=insectTreesData[i];
        const tree=await Tree.findOne({
          where:{
            tree:treeName
          }
        });
        const insect=await Insect.findOne({
          where:{
            name:insectName
          }
        });
        await InsectTree.create({
          insectId:insect.id,
          treeId:tree.id
        });
      }

  },

  down: async(queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    for( let i=0;i<insectTreesData.length;i++){
      const{treeName,insectName}=insectTreesData[i];
      const tree=await Tree.findOne({
        where:{
          tree:treeName
        }
      });
      const insect=await Insect.findOne({
        where:{
          name:insectName
        }
      });
      await InsectTree.destroy({
        where:{
          [Op.and]:[
            {insectId:insect.id},
            {treeId:tree.id}
          ]
        }
      });

    }
     
  }
};
