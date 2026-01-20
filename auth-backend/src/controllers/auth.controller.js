const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, RefreshToken } = require('../models');
const { generateAccessToken, generateRefreshToken } = require('../utils/token');

exports.register = async (req, res) => {
  const { email, password, name, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const usersCount = await User.count();
  const finalRole = usersCount === 0 ? 'admin' : role || 'user';

  const user = await User.create({
    email,
    password: hashedPassword,
    name,
    role: finalRole
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await RefreshToken.create({ token: refreshToken, UserId: user.id });

  res.status(201).json({
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    accessToken,
    refreshToken
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await RefreshToken.create({ token: refreshToken, UserId: user.id });

  res.json({
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    accessToken,
    refreshToken
  });
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;

  const storedToken = await RefreshToken.findOne({ where: { token: refreshToken } });
  if (!storedToken) return res.status(403).json({ message: 'Invalid refresh token' });

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const accessToken = jwt.sign(
    { id: decoded.id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '15m' }
  );

  res.json({ accessToken });
};

exports.logout = async (req, res) => {
  const { refreshToken } = req.body;
  await RefreshToken.destroy({ where: { token: refreshToken } });
  res.json({ message: 'Logged out successfully' });
};

exports.me = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: { exclude: ['password'] }
  });
  res.json(user);
};
