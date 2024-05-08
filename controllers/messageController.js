const Message = require("../models/message");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.message_list_get = asyncHandler(async (req, res, next) => {
    const allMessages = await Message.find()
        .sort({ timestamp: 1 })
        .populate("author")
        .exec();
  
    res.render("message_list", { title: "Messages", user: req.user, message_list: allMessages });
});

exports.message_create_post = [
    body("title")
        .trim()
        .isLength( { min: 1 })
        .escape()
        .withMessage("Title must be provided."),
    body("message_text")
        .trim()
        .isLength( { min: 1 })
        .escape()
        .withMessage("Message must be provided."),

    asyncHandler(async (req, res, next) => {
        console.log(req.body);
        const errors = validationResult(req);

        const message = new Message({
            title: req.body.title,
            author: req.user.id,
            text: req.body.message_text,
            timestamp: Date.now(),
        });

        if (!errors.isEmpty()) {
            res.render("create_message_form", {
                title: "Create New Message",
                message: message,
                user: req.user,
                errors: errors.array(),
            });
            return;
        } else {
            await message.save();
            res.redirect('/');
        };
    }),
];

exports.message_update_post = [];

exports.message_delete_post = asyncHandler(async (req, res, next) => {
    await Message.findByIdAndDelete(req.body.messageid);
    res.redirect("/messages");
});