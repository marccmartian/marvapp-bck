import { NextFunction, Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";

export const validateFields = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array().map(err => err.msg)
            // errors: errors
        });
    }

    req.validatedData = matchedData(req, { locations: ['query'] }) as any;
    
    next();
}