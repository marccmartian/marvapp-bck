import { body } from "express-validator";
import { StringSanitizer } from "../helpers/string-sanitizer";


export class RegisterUserValidator {

    static rules = [
        body("name")
            .notEmpty().withMessage("Missing name")
            .bail()
            .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/).withMessage("Name must contain only letters")
            .bail()
            .isLength({ min: 2 }).withMessage("Name must have at least 2 characters")
            .customSanitizer(value => StringSanitizer.capitalizeWords(value)),
        
        body("surname")
            .notEmpty().withMessage("Missing surname")
            .bail()
            .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/).withMessage("Surname must contain only letters")
            .bail()
            .isLength({ min: 2 }).withMessage("Name must have at least 2 characters")
            .customSanitizer(StringSanitizer.capitalizeWords),
        
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