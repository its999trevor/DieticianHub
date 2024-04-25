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
const generative_ai_1 = require("@google/generative-ai");
const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = process.env.API_KEY;
function runChat(data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (API_KEY) {
            const genAI = new generative_ai_1.GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: MODEL_NAME });
            const generationConfig = {
                temperature: 1,
                topK: 0,
                topP: 0.95,
                maxOutputTokens: 8192,
            };
            const safetySettings = [
                {
                    category: generative_ai_1.HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: generative_ai_1.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: generative_ai_1.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                    threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: generative_ai_1.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
            ];
            const chat = model.startChat({
                generationConfig,
                safetySettings,
                history: [],
            });
            const result = yield chat.sendMessage(data);
            const response = result.response;
            console.log(response.text());
            return response.text();
        }
    });
}
const router = express_1.default.Router();
router.get("/", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let meal_type = req.body.meal_type;
    const userId = req.user._doc._id;
    let data = yield userprofile_1.default.findOne({ userId });
    console.log(data);
    try {
        let data = yield userprofile_1.default.findOne({ userId });
        console.log(data);
        if (data) {
            let message = `give dietplan recommendation for ${meal_type} diet ${data} and return the data in json
            dietplan{
                breakfast{
                    {
                        "name",
                        "description",
                        "calories"
                    }
                },
                lunch{
                    {
                        "name",
                        "description",
                        "calories"
                    }
                },
                dinner{
                    {
                        "name",
                        "description",
                        "calories"
                    }
                }
            },
            additionalTips`;
            let newdata = yield runChat(message);
            console.log(newdata);
            let message2 = `take each "name" key from ${newdata} and return it as a json response like
              {
                name,
                calories:number,
                description,
                fats:how much fats are in it numbers,
                fibers:how much fibers are in it numbers,
                carbs:how much carbs are in it numbers,
                protein:how protien fats are in it numbers}
            } 
            `;
            console.log(message2);
            let newproddata = yield runChat(message2);
            console.log(newproddata);
            res.send(newdata);
        }
        else {
            res.status(404).send("User profile data not found");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}));
exports.default = router;
