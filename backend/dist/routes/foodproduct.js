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
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const generative_ai_1 = require("@google/generative-ai");
const API_KEY = process.env.API_KEY;
const genAI = new generative_ai_1.GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs_1.default.readFileSync(path)).toString("base64"),
            mimeType,
        },
    };
}
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
router.post('/uploadimage', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const img = req.file;
    const prompt = `identify the dish and return the data in json formet as 
                 name: { type: String, required: true, strictQuery: false },
                 calories: { type: Number, required: true },
                description:{type:String},
                fats: { type: Number, required: true },
                fibers: { type: Number, required: true },
                carbs: { type: Number, required: true },
                protein: { type: Number, required: true }
    `;
    if (img) {
        const imagePart = fileToGenerativePart(img.path, "image/jpeg");
        const result = yield model.generateContent([prompt, imagePart]);
        console.log(result.response.text());
        const cleanedResponse = result.response.text().replace(/```json\n/g, '')
            .replace(/```/g, '')
            .replace(/\n/g, '')
            .replace(/\\/g, '');
        const parsedResponse = JSON.parse(cleanedResponse);
        res.json(parsedResponse);
    }
}));
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name, calories, description, fats, fibers, carbs, protein } = req.body;
        const newData = yield foodproduct_1.default.find({ name });
        console.log(newData);
        if (newData.length == 0) {
            let newFood = new foodproduct_1.default({ name, calories, description, fats, fibers, carbs, protein });
            yield newFood.save();
            res.json({ data: newFood, message: "new foodproduct added" });
        }
        else {
            res.send({ exists: true, newData });
        }
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
