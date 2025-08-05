import { Router } from "express";
import fileUpload from "../services/fileUpload.service";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload/");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${name}-${uniqueSuffix}${ext}`);
    },
});

const upload = multer({ storage: storage });
const fileRouter = Router();

fileRouter.post("/fileUpload", upload.array("files"), fileUpload);

export default fileRouter;
