import { query } from "express-validator";

export class PaginateProjectsValidator {

    static rules = [
        query('limit')
            .optional()
            .isInt({ min: 1, max: 100 }).withMessage('Limit debe ser un número entero positivo (max 100).')
            .toInt(),

        query('isTop')
            .optional()
            .isBoolean({ loose: true }).withMessage('isTop debe ser un valor booleano (true/false)')
            .toBoolean(true),

        query('lastSerialId')
            .optional()
            .isNumeric().withMessage('last serial id debe ser un valor numerico')
            .toInt() 
    ];

}