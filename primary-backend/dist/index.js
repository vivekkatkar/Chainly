"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const zap_1 = __importDefault(require("./routes/zap"));
const actions_1 = __importDefault(require("./routes/actions"));
const trigger_1 = __importDefault(require("./routes/trigger"));
const app = (0, express_1.default)();
const PORT = 4000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1/user", user_1.default);
app.use("/api/v1/zap", zap_1.default);
app.use("/api/v1/trigger", trigger_1.default);
app.use("/api/v1/action", actions_1.default);
app.get("/test", (req, res) => {
    res.status(200).send("Server is running");
});
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
