'use strict';
module.exports = (sequelize, DataTypes) => {
  let Records = sequelize.define('Records', {
    pedestrians: DataTypes.INTEGER,
    bicycles: DataTypes.INTEGER,
    motorbikes: DataTypes.INTEGER,
    cars: DataTypes.INTEGER,
    lorries: DataTypes.INTEGER,
    timestamp: DataTypes.STRING,
  }, {});
  Records.associate = function(models) {
  };
  return Records;
};
