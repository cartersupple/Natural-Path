const jwt = require('jsonwebtoken');
require("dotenv").config()
const secret = process.env.SECRET;
const expiration = process.env.EXPIRATION;

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ firstName,lastName, email, _id, phone }) {
 
    const payload = { firstName, lastName, email, _id, phone};
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
