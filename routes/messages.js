const express = require('express');
const router = express.Router();

const message_controller = require("../controllers/messageController");

router.get('/', message_controller.message_list_get);

router.get('/create', function(req, res, next) {
    res.render('create_message_form', { title: 'Create New Message', user: req.user });
});

router.post('/create', message_controller.message_create_post);

router.post('/:id/delete', message_controller.message_delete_post);

module.exports = router;