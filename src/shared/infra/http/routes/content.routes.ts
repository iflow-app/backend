import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import { CreateContentController } from "../../../../modules/artifacts/useCases/createContent/CreateContentController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const contentRoutes = Router();

const uploadFile = multer(uploadConfig);
const createContentController = new CreateContentController();

contentRoutes.post(
  "/",
  ensureAuthenticated,
  uploadFile.single("content"),
  createContentController.handle
);

export { contentRoutes };
