import express from "express"
import { prismaClient } from "../db";

const router = express.Router();

router.get("/available", async (req, res) => {
    const availableActions = await prismaClient.availableAction.findMany({});

    res.status(200).json({
        availableActions
    });
    return;
})


export default router;