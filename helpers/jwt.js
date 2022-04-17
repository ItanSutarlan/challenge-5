require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = ({ id, username }) => {
  const token = jwt.sign({ id, username }, SECRET_KEY);
  return token;
};

module.exports = { generateToken };
