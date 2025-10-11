import { body } from "express-validator";

export class LoginUserValidator {
    static rules = [
        body("email")
            .notEmpty().withMessage("Missing email")
            .bail()
            .isEmail().withMessage("Email is not valid"),
                
        body("password")
            .notEmpty().withMessage("Missing password")
            .bail()
            .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    ]
}
