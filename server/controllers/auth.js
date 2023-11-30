const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    // Check user
    const { username, password } = req.body;
    let user = await User.findOne({ username: username }).exec();

    if (user) {
      return res.status(400).send(`User is already exists`);
    }

    // Encrypt
    const salt = await bcrypt.genSalt(10);
    user = new User({
      username,
      password
    })              

    user.password = await bcrypt.hash(password, salt);

    // Save
    user.save();
    res.send(`Register success!`);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Server Error`);
  }
}

exports.login = async (req, res) => {
  try {
    // Check user
    const { username, password } = req.body;
    const user = await User.findOneAndUpdate({ username: username }, { new: true });
    if (!user) {
      return res.status(400).send(`username is not exists`);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send(`Password is incorrect!`);
    }

    // Payload
    const payload = {
      user: {
        username: user.username
      }
    }

    // Generate token
    jwt.sign(payload, "jwtSecret", { expiresIn: '1d' }, (err, token) => {
      if (err) console.log(err);
      else res.json({ token, payload });
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).send(`Server Error`);
  }
}