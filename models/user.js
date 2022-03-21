"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static validatePassword(password, hash) {
      return bcrypt.compare(password, hash);
    }
  }
  user.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      hooks: {
        // beforeBulkCreate: async (user, options) => {
        //   // user.password = await bcrypt.hash(user.password, 10);
        //   console.log(user.password);
        // },
        // beforeCreate: async (user, options) => {
        //   user.password = await bcrypt.hash(user.password, 10);
        //   console.log(user.password);
        // },
      },
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
