import { body } from "express-validator";
import { StringSanitizer } from "../helpers/string-sanitizer";

export class UpdateProjectValidator {

    static rules = [
        body("title")
            .notEmpty().withMessage("Missing title")
            .bail()
            .isLength({ min: 2 }).withMessage("Tile must have at least 2 characters")
            .customSanitizer(StringSanitizer.capitalizeWords),
        
        body("description")
            .notEmpty().withMessage("Missing description")
            .bail()
            .isLength({ min: 5 }).withMessage("Tile must have at least 5 characters")
            .customSanitizer(StringSanitizer.capitalizeFirstWord),
        
        body("keywords")
            .notEmpty().withMessage("Missing keywords")
            .bail()
            .isArray().withMessage("keywords must be an array")
            .custom(value => value.length >= 2).withMessage("keywords must be greater than one"),
        
        body("keywords.*") 
            .isString().withMessage("Each keyword must be a string")
            .bail()
            .isLength({ min: 3 }).withMessage("Each keyword must have at least 3 characters")
            .customSanitizer(StringSanitizer.capitalizeWords),
        
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