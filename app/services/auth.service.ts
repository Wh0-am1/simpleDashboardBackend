import { Request, Response } from "express";
import { ERROR } from "../customTypes/ERROR";
import { db } from "../config/db";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/dotEnv";

export async function Login(req: Request, res: Response) {

    const { email, password } = req.body;
    const error: ERROR = new Error("");

    if (!(email && password)) {
        error.message = "please provide email and password";
        error.statusCode = 400;
        throw error;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        error.message = "please provide valid email";
        error.statusCode = 400;
        throw error;
    }

    const data = await db.user.findUnique({
        where: {
            email,
        },
    });

    if (!data) {
        error.message = "no data found";
        error.statusCode = 404;
        throw error;
    }

    const isPassword = await bcrypt.compare(password, data.password);

    if (!isPassword) {
        error.message = "Invalid Password";
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign(
        { id: data.id, name: data.name, email: data.email },
        SECRET as string,
        {
            expiresIn: "7d",
        },
    );


    res.status(200).json({
        success: true,
        message: "user logged in",
        id:data.id,
        name:data.name,
        token,
    });
}

export async function Register(req: Request, res: Response) {
    const {
        name,
        email,
        password,
    }: { name: string; email: string; password: string } = req.body;
    if (!(name && email && password)) {
        const error: ERROR = new Error("please provide all fields");
        error.statusCode = 400;
        throw error;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        const error: ERROR = new Error("please provide valid email");
        error.statusCode = 400;
        throw error;
    }

    const Salt = await bcrypt.genSalt(10);

    const HashPassword = await bcrypt.hash(password, Salt);

    const data = await db.user.create({
        data: {
            name,
            email,
            password: HashPassword,
        },
    });

    const token = jwt.sign(
        { id: data.id, name: data.name, email: data.email },
        SECRET as string,
        {
            expiresIn: "7d",
        },
    );

    res.status(201).json({
        success: true,
        message: "user created",
        id:data.id,
        token,
    });
}
