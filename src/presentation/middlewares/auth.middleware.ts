import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { prisma } from "../../infrastructure/database/prisma/prisma-client";

const errorResponse = (res: Response) => res.status(401).json("Invalid Token 😒");

export const validateJwt = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.header('Authorization');
    if(!authorization) return errorResponse(res);
    if(!authorization.startsWith('Bearer ')) return errorResponse(res);

    const token = authorization.split(' ').at(1) || '';

    try {
        const payload = await JwtAdapter.validateToken< {id:string} >(token);
        if(!payload) return errorResponse(res);

        const user = await prisma.user.findUnique({where: {id: payload.id}});
        if(!user) return errorResponse(res);

        if(!user.isEmailValidated) return res.status(401).json("User inactive");
        
        if(req.body) req.body.user = user;
        next();
    } catch (error) {
        console.log(error); // winstong
        res.status(500).json({error: "Internal server error"});
    }
}