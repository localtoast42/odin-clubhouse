const express = require('express');
const router = express.Router();

const user_controller = require("../controllers/userController");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/sign-up', (req, res, next) => {
    res.render('signup_form', { title: 'Sign Up' });
});

router.post('/sign-up', user_controller.user_create_post);

router.get('/join-club', (req, res, next) => {
    res.render('join_club', { title: 'Join the Club' });
});

router.post('/join-club', user_controller.user_join_club_post);

module.exports = router;