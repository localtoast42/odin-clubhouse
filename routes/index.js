const express = require('express');
const router = express.Router();

const user_controller = require("../controllers/userController");

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

router.get('/sign-up', (req, res, next) => {
    res.render('signup_form', { title: 'Sign Up' });
});

router.post('/sign-up', user_controller.user_create_post);

module.exports = router;
