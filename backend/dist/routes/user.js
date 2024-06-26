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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../model/user"));
const auth_1 = require("../utils/auth");
const router = express_1.default.Router();
const saltRounds = 10;
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        let hashPassword = yield bcrypt_1.default.hash(password, saltRounds);
        let newUser = new user_1.default({ name, email, password: hashPassword });
        yield newUser.save();
        res.status(200).json({ message: "New user added", userId: newUser._id });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        let newUser = yield user_1.default.findOne({ email });
        if (!newUser) {
            throw new Error("Invalid email");
        }
        else {
            let match = yield bcrypt_1.default.compare(password, newUser.password);
            if (match) {
                let token = (0, auth_1.createJwtToken)(newUser);
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 3600000,
                    path: '/',
                });
                res.json({ message: "user logged in", token });
            }
            else {
                throw new Error("Invalid password");
            }
        }
    }
    catch (error) {
        if (error.message === "Invalid email") {
            res.status(400).json({ error: "Invalid email" });
        }
        else if (error.message === "Invalid password") {
            res.status(400).json({ error: "Invalid password" });
        }
        else {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
}));
router.get("/logout", (req, res) => {
    res.cookie("token", "", { expires: new Date(0) });
    res.send("logged out successfully");
});
router.delete("/deleteUser/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const deletedUser = yield user_1.default.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).send("User not found");
        }
        res.send("User deleted successfully");
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}));
exports.default = router;
