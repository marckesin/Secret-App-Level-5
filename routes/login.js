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
        }
        req.logIn(user, (err) => {
            if (err) {
                next(err);
            }
            res.redirect('/secrets');
        });
    })(req, res, next);
});

module.exports = router;