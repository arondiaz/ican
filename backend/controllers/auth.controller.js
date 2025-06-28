import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { Worker } from "../models/Worker.js";
import { Category } from "../models/Categories.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password.trim()))) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // se guarda el token en las cookies
  res
    .cookie("sessiontokenadms", token, {
      httpOnly: true, // No accesible desde JS en el navegador
      secure: true, // obligatorio con sameSite none
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24, // 1 día
    })
    .json({ success: true });
};

export const metrics = async (req, res) => {
  try {
    const workers = await Worker.findAll({
      include: {
        model: Category,
        through: { attributes: [] },
      },
    });
    const metrics = {
      total: workers.length,
      porCategoria: {
        Electricistas: workers.filter((w) =>
          w.categories.some((c) => c.name === "Electricista")
        ).length,
        Gasistas: workers.filter((w) =>
          w.categories.some((c) => c.name === "Gasista")
        ).length,
        Plomeros: workers.filter((w) =>
          w.categories.some((c) => c.name === "Plomero")
        ).length,
        Carpinteros: workers.filter((w) =>
          w.categories.some((c) => c.name === "Carpintero")
        ).length,
        Cerrajeros: workers.filter((w) =>
          w.categories.some((c) => c.name === "Cerrajero")
        ).length,
        Mecanicos: workers.filter((w) =>
          w.categories.some((c) => c.name === "Mecanico")
        ).length,
        Gasistas: workers.filter((w) =>
          w.categories.some((c) => c.name === "Mecanico")
        ).length,
        Gomeros: workers.filter((w) =>
          w.categories.some((c) => c.name === "Gomero")
        ).length,
        "Instalador de aires": workers.filter((w) =>
          w.categories.some((c) => c.name === "Instalador de aire")
        ).length,
        Jardineros: workers.filter((w) =>
          w.categories.some((c) => c.name === "Jardinero")
        ).length,
        Limpieza: workers.filter((w) =>
          w.categories.some((c) => c.name === "Limpieza")
        ).length,
      },
      porCiudad: {
        Rosario: workers.filter((w) => w.city === "Rosario").length,
        Casilda: workers.filter((w) => w.city === "Casilda").length,
        "Santa Fe": workers.filter((w) => w.city === "Santa Fe").length,
      },
    };
    res.json(metrics);
  } catch (err) {
    res.status(500).json({ error: "Error al calcular métricas" });
  }
};
