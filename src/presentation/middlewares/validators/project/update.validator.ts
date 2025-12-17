import { body } from "express-validator";
import { StringSanitizer } from "../helpers/string-sanitizer";

export class UpdateProjectValidator {

    static rules = [
        body("title")
            .optional({ nullable: true })
            .notEmpty().withMessage("Missing title")
            .bail()
            .isLength({ min: 2 }).withMessage("Tile must have at least 2 characters")
            .customSanitizer(StringSanitizer.capitalizeWords),
        
        body("description")
            .optional({ nullable: true })
            .notEmpty().withMessage("Missing description")
            .bail()
            .isLength({ min: 5 }).withMessage("Tile must have at least 5 characters")
            .customSanitizer(StringSanitizer.capitalizeFirstWord),
        
        body("tags")
            .optional({ nullable: true })
            .notEmpty().withMessage("Missing tags")
            .bail()
            .isArray().withMessage("tags must be an array")
            .custom(value => value.length >= 2).withMessage("tags must be greater than one"),
        
        body("tags.*")
            .optional()
            .isString().withMessage("Each keyword must be a string")
            .bail()
            .isLength({ min: 2 }).withMessage("Each keyword must have at least 2 characters")
            .customSanitizer(StringSanitizer.capitalizeWords),
        
        body("githubUrl")
            .optional({ nullable: true })
            .notEmpty().withMessage("Missing githubUrl")
            .bail()
            .isLength({ min: 5 }).withMessage("Github url must have at least 5 characters"),
        
        body("prodUrl")
            .optional({ nullable: true })
            .notEmpty().withMessage("Missing prodUrl")
            .bail()
            .isLength({ min: 5 }).withMessage("Production url must have at least 5 characters")
    ]    

}