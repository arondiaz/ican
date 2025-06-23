// models/index.js
import { sequelize } from "../database/database.js";
import { Worker } from "./Worker.js";
import { Category } from "./Categories.js";
import { User } from "./User.js";

Worker.belongsToMany(Category, {
  through: "worker_category",
  foreignKey: "worker_id",
});
Category.belongsToMany(Worker, {
  through: "worker_category",
  foreignKey: "category_id",
});

export { sequelize, Worker, Category, User };
