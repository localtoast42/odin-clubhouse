const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.user_create_post = [
    body("username")
        .trim()
        .isLength( { min: 1 })
        .escape()
        .withMessage("Username must be provided.")
        .isAlphanumeric()
        .withMessage("Username has non-alphanumeric characters."),
    body("user_password")
        .trim()
        .isLength( { min: 1 })
        .escape()
        .withMessage("Password must be provided."),
    body("confirm_password")
        .trim()
        .isLength( { min: 1 })
        .escape()
        .withMessage("Password must be provided."),
    body("first_name")
        .trim()
        .isLength( { min: 1 })
        .escape()
        .withMessage("First name must be provided.")
        .isAlphanumeric()
        .withMessage("First name has non-alphanumeric characters."),
    body("last_name")
        .trim()
        .isLength( { min: 1 })
        .escape()
        .withMessage("Last name must be provided.")
        .isAlphanumeric()
        .withMessage("Last name has non-alphanumeric characters."),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const user = new User({
            username: req.body.username,
            password: req.body.user_password,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            admin: !(undefined===req.body.is_admin),
        });

        if (!errors.isEmpty()) {
            res.render("signup_form", {
                title: "Sign Up",
                user: user,
                errors: errors.array(),
            });
            return;
        } else {
            await user.save();
            res.redirect("/");
        }
    }),
];