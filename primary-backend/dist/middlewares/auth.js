"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
function authMiddleware(req, res, next) {
    const token = req.headers.authorization; // 
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.JWT_PASSWORD);
        // @ts-ignore
        req.id = payload.id;
        next();
    }
    catch (e) {
        res.status(403).json({
            message: "Invalid Token or expiered"
        });
        return;
    }
}
