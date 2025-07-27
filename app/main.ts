import express from "express";
import authRoute from "./controller/auth.controller";
import { PORT } from "./config/dotEnv";
import ErrorHandler from "./middleware/error.middleware";
import cors from 'cors'


const app = express();

app.use(cors({origin:'http://localhost:5173'}))
app.use(express.json());

app.use("/api/v1/", authRoute);

app.use(ErrorHandler);

app.listen(PORT || 3000, () => {
    console.log("listening....");
});
