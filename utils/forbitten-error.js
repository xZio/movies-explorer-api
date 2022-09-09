const { FORBITTEN } = require('./errors');

module.exports = class ForbittenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBITTEN;
  }
};
