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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_1 = __importDefault(require("./routes/user"));
const dbconfig_1 = __importDefault(require("./config/dbconfig"));
const userprofile_1 = __importDefault(require("./routes/userprofile"));
const foodproduct_1 = __importDefault(require("./routes/foodproduct"));
const meal_1 = __importDefault(require("./routes/meal"));
const port = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'static')));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/", user_1.default);
app.use("/user", userprofile_1.default);
app.use("/food", foodproduct_1.default);
app.use("/meal", meal_1.default);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbconfig_1.default)();
    console.log(`Server started at port:${port}`);
}));
