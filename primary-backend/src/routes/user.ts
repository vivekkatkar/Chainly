import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/auth";
import { SigninSchema, SignupSchema } from "../types";
import { prismaClient } from "../db";
import { JWT_PASSWORD } from "../config/config";

const router = express.Router();

router.post("/signup", async (req, res) => {
    const body = req.body;
    const parsedData = SignupSchema.safeParse(body);

    if(!parsedData.success){
        res.status(411).json({
            message : "Incorrect Inputs"
        });
        return;
    }

    const userExists = await prismaClient.user.findFirst({
        where : {
            email : parsedData.data?.username
        }
    })

    if(userExists){
        res.status(403).json({
            message : "Username already taken by another users"
        });
        return;
    }

    await prismaClient.user.create({
        data : {
            email : parsedData.data!.username,
            //  Hash users password and then store it into database, don't store it directly 
            password : parsedData.data!.password,
            name : parsedData.data!.name
        }
    });

    // await sendEmail() -> Sends email to user for verification and add verified field to database so user will login only email is verified , for that modify authMiddleware to check user has verified or not 

    res.status(200).json({
        message : "Please verify your account by checking your email"
    });
    return;
})

router.post("/signin", async (req, res) => {
    const body = req.body;
    const parsedData = SigninSchema.safeParse(body);

    if(!parsedData.success){
        res.status(411).json({
            message : "Incorrect Inputs"
        });
        return;
    }

    const user = await prismaClient.user.findFirst({
        where : {
            email : parsedData.data?.username,
            password : parsedData.data!.password
        }
    })

    if(!user){
        res.status(403).json({
            message : "User not found"
        })
        return;
    }

    const token = jwt.sign({
        id : user!.id
    }, JWT_PASSWORD);

    res.status(200).json({
        message : "Success : User logged in",
        token : token
    });

    return;
})

router.get("/", authMiddleware, async (req : Request, res : Response) => {
    // @ts-ignore
    const id = req.id;
    const user = await prismaClient.user.findFirst({
        where : {
            id : id
        },
        select : {
            name : true,
            email : true
        }
    });

    res.status(200).json({
        user
    });

    return;
})

export default router;