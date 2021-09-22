const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const brcypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validate = [
  check('fullName')
    .isLength({ min: 2 })
    .withMessage('Your full name is required'),
  check('email').isEmail().withMessage('Please provide a valid email'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password my be at least 6 characters'),
];

const loginValidate = [
  check('email').isEmail().withMessage('Please provide a valid email'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password my be at least 6 characters'),
];

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, fullName: user.fullName },
    'SUPERSECRET'
  );
};

// registering new user, validating with correct inputs and check if user already exists with email address
router.post('/register', validate, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const userExists = await User.find({ email: req.body.email });

  if (!userExists) {
    return res
      .status(400)
      .send({ success: false, message: 'Email already exists' });
  }

  const salt = await brcypt.genSalt(10);
  const hasPassword = await brcypt.hash(req.body.password, salt);

  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: hasPassword,
  });

  try {
    const savedUser = await user.save();

    // create token
    const token = generateToken(user);

    res.status(200).send({
      success: true,
      data: {
        id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: 'server error' });
    console.log(error);
  }
});

// checking login, email exists, password is correct
router.post('/login', loginValidate, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(404)
      .send({ success: false, message: 'User is not registered' });
  }

  const validPassword = await brcypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res
      .status(404)
      .send({ success: false, message: 'invalid email or password' });
  }

  // create token
  const token = generateToken(user);

  res
    .header('auth-token', token)
    .send({ success: true, message: 'Logged in succesfully', token });
});

module.exports = router;
