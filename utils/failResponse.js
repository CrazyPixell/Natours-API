module.exports = res =>
  res.status(404).json({
    status: 'fail',
    message: 'Invalid id',
  });
