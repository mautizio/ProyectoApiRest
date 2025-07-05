const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { generateTokens } = require('../utils/token.util');
const { JWT_REFRESH_SECRET } = process.env;

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed, role });
  await user.save();
  res.status(201).json({ message: 'Usuario registrado' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Credenciales inválidas' });

  const tokens = generateTokens(user);
  user.refreshToken = tokens.refreshToken;
  await user.save();
  res.json(tokens);
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: 'Token requerido' });

  try {
    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const user = await User.findById(payload.id);
    if (!user || user.refreshToken !== refreshToken)
      return res.status(403).json({ message: 'Token inválido' });

    const tokens = generateTokens(user);
    user.refreshToken = tokens.refreshToken;
    await user.save();
    res.json(tokens);
  } catch {
    res.status(403).json({ message: 'Token inválido' });
  }
};
