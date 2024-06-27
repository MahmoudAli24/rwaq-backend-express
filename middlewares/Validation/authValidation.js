const {body} = require("express-validator");

const registerValidation = () => {
    return [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Name is required")
            .isLength({min: 2})
            .withMessage("Name must be at least 2 characters long")
            .custom(value => {
                if (/\s/.test(value)) {
                    throw new Error("Name should not contain spaces");
                }
                return true;
            }),
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Valid email is required")
            .custom(value => {
                if (/\s/.test(value)) {
                    throw new Error("Email should not contain spaces");
                }
                return true;
            }),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required")
            .isLength({min: 6})
            .withMessage("Password must be at least 6 characters long"),
        body("confirmPassword")
            .trim()
            .notEmpty()
            .withMessage("Confirm password is required")
            .custom((value, {req}) => {
                if (value !== req.body.password) {
                    throw new Error("Passwords do not match");
                }
                return true;
            }),
    ];
};

const loginValidation = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Valid email is required"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required")
    ];
};

module.exports = {
    registerValidation,
    loginValidation,
};
