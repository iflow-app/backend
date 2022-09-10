import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import { CreateContentController } from "../../../../modules/artifacts/useCases/createContent/CreateContentController";

const contentRoutes = Router();

const uploadFile = multer(uploadConfig);
const createContentController = new CreateContentController();

contentRoutes.post(
  "/",
  uploadFile.single("content"),
  createContentController.handle
);

export { contentRoutes };
