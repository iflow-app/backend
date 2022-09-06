import crypto from "crypto";
import { Request } from "express";
import multer from "multer";
import { resolve, extname } from "path";

export default {
  upload(folder: string): multer.Options {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;
          return callback(null, fileName);
        },
      }),
      fileFilter: (
        request: Request,
        file: Express.Multer.File,
        callback: multer.FileFilterCallback
      ) => {
        const extensions = [".png", ".jpg", ".jpeg", ".json", ".mp3", ".wav"];

        const fileExtension = extname(file.originalname);

        if (!extensions.some((item) => item === fileExtension)) {
          return callback(null, false);
        }

        return callback(null, true);
      },
    };
  },
};
