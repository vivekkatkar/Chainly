import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config/config";

export default function authMiddleware(req : Request, res : Response, next : NextFunction){
    const token = req.headers.authorization as unknown as string; // 
    
    try{
        const payload = jwt.verify(token, JWT_PASSWORD);
        
        // @ts-ignore
        req.id = payload.id;
        next();
    }catch(e){
        res.status(403).json({
            message : "Invalid Token or expiered"
        })
        return;
    }
}