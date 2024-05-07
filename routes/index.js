const express = require('express');
const router = express.Router();
const passport = require("passport");

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Home', user: req.user });
});

router.get('/login', (req, res, next) => {
    res.render('login', { title: 'Login' });
});

router.post('/login',
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
    })
);

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

module.exports = router;
