import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from "../models/User.js"

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};
