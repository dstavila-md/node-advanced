const { clearHash } = require('../services/cache');

module.exports = async (req, res, next) => {
  await next(); // wait until route handler (downstream middleware) is done
  clearHash(req.user.id);
};
