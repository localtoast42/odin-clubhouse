const express = require('express');
const router = express.Router();
const passport = require("passport");
const Message = require("../models/message");

/* GET home page. */
router.get('/', (req, res, next) => {
    res.redirect("/messages");
});

router.get('/login', (req, res, next) => {
    res.render('login', { title: 'Login' });
});

router.post('/login',
    passport.authenticate("local", {
        successRedirect: "/messages",
        failureRedirect: "/login",
        failureFlash: true
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
