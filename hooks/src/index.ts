import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express()
const client = new PrismaClient();

app.use(express.json());
app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;

    await client.$transaction(async (tx) => {
        const run = await tx.zapRun.create({
            data: {
                zapId: zapId,
                metadata: body 
            }
        });

        await tx.zapRunOutbox.create({
            data: {
                zapRunId: run.id,
            }
        });
    });

    res.status(200).json({ message: "Zap run created successfully" });
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
