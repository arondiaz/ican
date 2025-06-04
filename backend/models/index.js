// models/index.js
import { sequelize } from "../database/database.js";
import { Worker } from "./Worker.js";
import { Category } from "./Categories.js";

Worker.belongsToMany(Category, {
  through: "worker-category",
  foreignKey: "worker_id",
});
Category.belongsToMany(Worker, {
  through: "worker-category",
  foreignKey: "category_id",
});

export { sequelize, Worker, Category };
