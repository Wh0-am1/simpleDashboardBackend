import { NextFunction, Request, Response } from "express";
import { ERROR } from "../customTypes/ERROR";

export default function ErrorHandler(
    err: ERROR,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message,
    });
}
