import 'dotenv/config'
import express from 'express'
import path from 'path'
import cors from 'cors'
import cookieParser from "cookie-parser";
import userlogin from "./routes/user"
import connect from './config/dbconfig';
import userprofile from './routes/userprofile';
import foodproduct from './routes/foodproduct';
import diet from './routes/diet';
import meal from './routes/meal';
const port=process.env.PORT || 8000;
const app = express();
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // Enable credentials (cookies, authorization headers) cross-origin
}));
app.use("/",userlogin);
app.use("/user",userprofile);
app.use("/food",foodproduct);
app.use("/meal",meal);
app.use("/diet",diet);
app.listen(port, async () => {
      await connect();
      console.log(`Server started at port:${port}`);
    });
 

