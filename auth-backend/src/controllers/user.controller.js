const { User } = require('../models');

exports.getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const { rows, count } = await User.findAndCountAll({
    limit,
    offset,
    attributes: { exclude: ['password'] }
  });

  res.json({
    users: rows,
    total: count,
    page,
    limit
  });
};
