"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const types_1 = require("../types");
const db_1 = require("../db");
const config_1 = require("../config/config");
const router = express_1.default.Router();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const body = req.body;
    const parsedData = types_1.SignupSchema.safeParse(body);
    if (!parsedData.success) {
        res.status(411).json({
            message: "Incorrect Inputs"
        });
        return;
    }
    const userExists = yield db_1.prismaClient.user.findFirst({
        where: {
            email: (_a = parsedData.data) === null || _a === void 0 ? void 0 : _a.username
        }
    });
    if (userExists) {
        res.status(403).json({
            message: "Username already taken by another users"
        });
        return;
    }
    yield db_1.prismaClient.user.create({
        data: {
            email: parsedData.data.username,
            //  Hash users password and then store it into database, don't store it directly 
            password: parsedData.data.password,
            name: parsedData.data.name
        }
    });
    // await sendEmail() -> Sends email to user for verification and add verified field to database so user will login only email is verified , for that modify authMiddleware to check user has verified or not 
    res.status(200).json({
        message: "Please verify your account by checking your email"
    });
    return;
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const body = req.body;
    const parsedData = types_1.SigninSchema.safeParse(body);
    if (!parsedData.success) {
        res.status(411).json({
            message: "Incorrect Inputs"
        });
        return;
    }
    const user = yield db_1.prismaClient.user.findFirst({
        where: {
            email: (_a = parsedData.data) === null || _a === void 0 ? void 0 : _a.username,
            password: parsedData.data.password
        }
    });
    if (!user) {
        res.status(403).json({
            message: "User not found"
        });
        return;
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id
    }, config_1.JWT_PASSWORD);
    res.status(200).json({
        message: "Success : User logged in",
        token: token
    });
    return;
}));
router.get("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const id = req.id;
    const user = yield db_1.prismaClient.user.findFirst({
        where: {
            id: id
        },
        select: {
            name: true,
            email: true
        }
    });
    res.status(200).json({
        user
    });
    return;
}));
exports.default = router;
