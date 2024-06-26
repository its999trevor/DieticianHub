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
import dailylog from './routes/dailylog';
const port=process.env.PORT || 8000;
const app = express();
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../frontend/dist')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, 
}));
app.use("/",userlogin);
app.use("/user",userprofile);
app.use("/food",foodproduct);
app.use("/meal",meal);
app.use("/diet",diet);
app.use("/log",dailylog);
app.listen(port, async () => {
      await connect();
      // console.log(__dirname+" dest ");
      console.log(`Server started at port:${port}`);
    });
 

