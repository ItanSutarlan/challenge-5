const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({
      where: {
        username,
      },
    });
    if (user) {
      res.status(409).json({ message: 'The username already registered!' });
      return;
    }
    user = await User.create({
      username,
      password,
    });
    res.status(201).json({ message: 'User successfully created!' });
  } catch ({ errors }) {
    console.log(errors);
    res.status(400).json(errors[0].message);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: {
      username,
    },
  });
  if (!user) {
    res.status(404).json({ message: 'User not found!' });
    return;
  }
  if (!comparePassword(password, user.password)) {
    res
      .status(401)
      .json({ message: 'Please enter a valid username or password' });
    return;
  }
  res
    .status(200)
    .json({ message: 'Succesfully login', token: generateToken(user) });
};

module.exports = { register, login };
