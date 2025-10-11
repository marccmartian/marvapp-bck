import { Response } from "express";
import { CustomError } from "./custom-errors";

export const handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
        return res.status(error.status).json({ error: error.message });
    }

    console.log("****===== ERROR =====****");    
    console.log(error);     // logger
    return res.status(500).json({ error: "Internal Service Error!!! 😥" });
}
