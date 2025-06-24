import express from "express"
import { prismaClient } from "../db";

const router = express.Router();

router.get("/available", async (req, res) => {
    const availableTriggers = await prismaClient.availableTrigger.findMany({});

    res.status(200).json({
        availableTriggers
    });
    return;
})

export default router;