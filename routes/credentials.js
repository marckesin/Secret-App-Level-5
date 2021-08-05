const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.get('/', (req, res, next) => {
    if (req.isAuthenticated()) {
        User.findOne({ username: req.user.username }, (err, result) => {
            if (!err && result) {
                res.render('credentials', { credentials: result });
            } else {
                next(err);
            }
        });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;