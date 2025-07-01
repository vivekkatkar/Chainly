import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { ZapCreateSchema } from "../types";
import { prismaClient } from "../db";
import { z } from "zod";

const router = Router();

router.post("/", authMiddleware, async (req, res) => {
    // @ts-ignore
    const id = req.id; 
    
    const body = req.body;
    const parsedData = ZapCreateSchema.safeParse(body);

    if(!parsedData.success){
        res.status(411).json({
            message : "Invalid Inputs"
        });

        return;
    }

    console.log(parsedData);

    const zapId = await prismaClient.$transaction(async (tx) => {
        const zap =  await prismaClient.zap.create({
            data : {
                userId : parseInt(id), 
                triggerId : "",
                actions : {
                    create : parsedData.data.actions.map((x, index) => ({
                        actionId : x.availableactionId,
                        sortingOrder : index,
                        metadata : x.actionMetadata
                    }))
                }
            }
        })

        const trigger = await tx.trigger.create({
            data : {
                triggerId : parsedData.data.availabletriggerId,
                zapId : zap.id
            }
        })

        await tx.zap.update({
            where : {
                id : zap.id
            },
            data : {
                triggerId : trigger.id
            }
        })

        return zap.id;
    })

    res.status(200).json({
        message : `Zap created sucessfully with zap id : ${zapId}`
    });
    return;
})

router.get("/", authMiddleware, async (req, res) => {
    // @ts-ignore
    const id = req.id;

    const zaps = await prismaClient.zap.findMany({
        where : {
            userId : id
        },
        include : {
            actions : {
                include : {
                    type : true
                }
            },
            trigger : {
                include : {
                    type : true
                }
            }
        }
    });

    res.status(200).json({
        zaps
    });

    return;
})

router.get("/:zapId", authMiddleware, async (req, res) => {
     // @ts-ignore
    const id = req.id;
    const zapId = req.params.zapId;

    const zap = await prismaClient.zap.findFirst({
        where : {
            userId : id,
            id : zapId
        },
        include : {
            actions : {
                include : {
                    type : true
                }
            },
            trigger : {
                include : {
                    type : true
                }
            }
        }
    });

    res.status(200).json({
        zap
    });

    return;

    console.log("zap details with specific id");
})

export default router;