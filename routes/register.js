const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user.model');

router.get('/', (req, res) => {
  res.render('register', { info: "" });
});

router.post('/', async (req, res, next) => {
  await User.register(new User({ username: req.body.username }), req.body.password, (err, account) => {
    if (err) {
      res.render('register', { info: 'Usuário já existe!' });
    } else {
      passport.authenticate('local')(req, res, () => {
        res.redirect('/secrets');
      });
    }
  });
});

module.exports = router;