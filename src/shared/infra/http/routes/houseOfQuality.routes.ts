import { Router } from "express";

import { CreateHouseOfQualityController } from "../../../../modules/requirements/useCases/createHouseOfQuality/CreateHouseOfQualityController";
import { ListHouseOfQualityController } from "../../../../modules/requirements/useCases/listHouseOfQuality/ListHouseOfQualityController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const houseOfQualityRoutes = Router();

const createHouseOfQualityController = new CreateHouseOfQualityController();
houseOfQualityRoutes.post(
  "/",
  ensureAuthenticated,
  createHouseOfQualityController.handle
);

const listHouseOfQualityController = new ListHouseOfQualityController();
houseOfQualityRoutes.get(
  "/",
  ensureAuthenticated,
  listHouseOfQualityController.handle
);

export { houseOfQualityRoutes };
