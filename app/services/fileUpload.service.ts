import { Request, Response } from "express";

export default async function fileUpload(req: Request, res: Response) {
    res.send({
        success: true,
        message: "file uploaded successsfully ",
    });
}
