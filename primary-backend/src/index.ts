import express from "express";
import cors from "cors";
import useRouter  from "./routes/user";
import zapRouter from "./routes/zap";


const app = express()
const PORT = 4000

app.use(express.json())
app.use(cors())
app.use("/api/v1/user", useRouter);
app.use("/api/v1/zap", zapRouter);

app.get("/test", (req, res) => {
    res.status(200).send("Server is running");
})

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})