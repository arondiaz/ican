import app from "./app.js";
import { sequelize } from "./database/database.js";
import "./models/index.js";
import { Category } from "./models/Categories.js";
import { User } from "./models/index.js";
import bcrypt from "bcrypt";

const port = 4444;

async function main() {
  try {
    await sequelize.sync({ force: false });
    const count = await Category.count();
    if (count === 0) {
      await Category.bulkCreate([
        { name: "Electricista" },
        { name: "Plomero" },
        { name: "Carpintero" },
        { name: "Gasista" },
        { name: "Mecanico" },
        { name: "Gomero" },
        { name: "Instalador de aire" },
        { name: "Cerrajero" },
        { name: "Jardinero" },
        { name: "Limpieza" },
      ]);
      console.log("Categorías iniciales creadas");
    }

    // Crear usuario admin si no existe
    const adminEmail = "admin";
    const adminPass = "root";
    const existing = await User.findOne({ where: { email: adminEmail } });

    if (!existing) {
      await User.create({
        email: adminEmail,
        password: await bcrypt.hash(adminPass, 10),
      });
      console.log("-********* Usuario ADMIN creado *********-");
    }

    app.listen(port);

    console.log("Server working on port", port);
  } catch (error) {
    console.error("Unable to connect to database", error);
  }
}

main();
