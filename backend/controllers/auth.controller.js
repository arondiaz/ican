import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";

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
  res.cookie("sessiontokenadms", token, {
      httpOnly: true, // No accesible desde JS en el navegador
      secure: process.env.NODE_ENV === "production", // solo HTTPS en producción
      sameSite: "lax", // protección CSRF básica
      maxAge: 1000 * 60 * 60 * 24, // 1 día
    })
    .json({ success: true });
};
