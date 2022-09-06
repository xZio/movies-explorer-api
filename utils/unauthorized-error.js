const { UNAUTHORIZED } = require('./errors');

module.exports = class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
};
