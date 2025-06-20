import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Worker = sequelize.define("workers", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },

  description: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  image:{
    type: DataTypes.STRING,
  }
});
