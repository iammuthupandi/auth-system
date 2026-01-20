const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');

const RefreshToken = sequelize.define('RefreshToken', {
  token: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

RefreshToken.belongsTo(User);
User.hasMany(RefreshToken);

module.exports = RefreshToken;
