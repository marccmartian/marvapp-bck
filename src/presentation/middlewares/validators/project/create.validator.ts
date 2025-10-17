import { body } from "express-validator";
import { StringSanitizer } from "../helpers/string-sanitizer";

export class CreateProjectValidator {

    static rules = [
        body("title")
            .notEmpty().withMessage("Missing title")
            .bail()
            .isLength({ min: 2 }).withMessage("Tile must have at least 2 characters")
            .customSanitizer(value => StringSanitizer.capitalizeWords(value)),
        
        body("description")
            .notEmpty().withMessage("Missing description")
            .bail()
            .isLength({ min: 5 }).withMessage("Tile must have at least 5 characters")
            .customSanitizer(value => StringSanitizer.capitalizeWords(value)),
        
        body("githubUrl")
            .notEmpty().withMessage("Missing githubUrl")
            .bail()
            .isLength({ min: 5 }).withMessage("Github url must have at least 5 characters"),
        
        body("prodUrl")
            .notEmpty().withMessage("Missing prodUrl")
            .bail()
            .isLength({ min: 5 }).withMessage("Production url must have at least 5 characters")
    ]

}