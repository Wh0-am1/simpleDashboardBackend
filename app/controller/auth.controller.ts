import { Router } from "express";
import { Login, Register } from "../services/auth.service";

const authRoute = Router();

authRoute.post("/login", Login);
authRoute.post("/register", Register);

export default authRoute;
