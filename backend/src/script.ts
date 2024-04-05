import 'dotenv/config'
import express from 'express'
import path from 'path'
import cors from 'cors'
import cookieParser from "cookie-parser";
import userlogin from "./routes/user"
import connect from './config/dbconfig';
import userprofile from './routes/userprofile';
const port=process.env.PORT || 8000;
const app = express();
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/",userlogin);
app.use("/user",userprofile);
app.listen(port, async () => {
      await connect();
      console.log(`Server started at port:${port}`);
    });
 
