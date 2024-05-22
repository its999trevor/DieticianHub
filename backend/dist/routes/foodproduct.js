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
const foodproduct_1 = __importDefault(require("../model/foodproduct"));
const router = express_1.default.Router();
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name, calories, description, fats, fibers, carbs, protein } = req.body;
        let newFood = new foodproduct_1.default({ name, calories, description, fats, fibers, carbs, protein });
        yield newFood.save();
        res.json({ data: newFood, message: "new foodproduct added" });
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
router.get("/showitem", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const regexPattern = new RegExp(`^${name}`, 'i');
        const newData = yield foodproduct_1.default.find({ name: regexPattern });
        res.json(newData);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
router.post("/addmany", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let foodProductsData = req.body;
        let insertedFoodProducts = yield foodproduct_1.default.insertMany(foodProductsData);
        res.send("added products");
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
router.put("/update/:foodProductId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foodProductId = req.params.foodProductId;
        const { name, calories, fats, fibers, carbs, protein } = req.body;
        const updatedFoodProduct = yield foodproduct_1.default.findByIdAndUpdate(foodProductId, {
            name,
            calories,
            fats,
            fibers,
            carbs,
            protein
        }, { new: true });
        res.json(updatedFoodProduct);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
router.delete("/delete/:foodProductId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foodProductId = req.params.foodProductId;
        yield foodproduct_1.default.findByIdAndDelete(foodProductId);
        res.send("Food product deleted successfully");
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
exports.default = router;
