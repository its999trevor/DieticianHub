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
const userprofile_1 = __importDefault(require("../model/userprofile"));
const auth_1 = require("../utils/auth");
var Activity;
(function (Activity) {
    Activity["low"] = "low";
    Activity["moderate"] = "moderate";
    Activity["high"] = "high";
})(Activity || (Activity = {}));
const router = express_1.default.Router();
router.post("/", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { weight, height, age, activity } = req.body;
        if (!(activity in Activity)) {
            throw new Error("Invalid activity value");
        }
        const userId = req.user._doc._id;
        const newProfile = new userprofile_1.default({ userId, weight, height, age, activity });
        yield newProfile.save();
        res.send("UserProfile added");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}));
router.get("/:userId", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        // console.log(userId);
        const profile = yield userprofile_1.default.findOne({ userId });
        if (!profile) {
            return res.status(404).send("User profile not found");
        }
        res.json(profile);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}));
router.put("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const { weight, height, age, activity } = req.body;
        const updatedProfile = yield userprofile_1.default.updateOne({ userId: userId }, { $set: { weight, height, age, activity } });
        res.json({ message: "User profile updated successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}));
router.delete("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        yield userprofile_1.default.findOneAndDelete({ userId });
        res.send("user deleted");
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}));
exports.default = router;
