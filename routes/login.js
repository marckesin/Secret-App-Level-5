const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', { info: "" });
});

router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            next(err);
        }
        else if (!user) {
            res.render('login', { info: "Email ou senha inválidos!" });
        } else {
            req.logIn(user, (err) => {
                if (!err) {
                    res.redirect('/secrets');
                } else {
                    next(err);
                }
            });
        }
    })(req, res, next);
});

module.exports = router;