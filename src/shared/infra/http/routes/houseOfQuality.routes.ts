import { Router } from "express";

import { CreateHouseOfQualityController } from "../../../../modules/requirements/useCases/createHouseOfQuality/CreateHouseOfQualityController";
import { ListHouseOfQualityController } from "../../../../modules/requirements/useCases/listHouseOfQuality/ListHouseOfQualityController";

const houseOfQualityRoutes = Router();

const createHouseOfQualityController = new CreateHouseOfQualityController();
houseOfQualityRoutes.post("/", createHouseOfQualityController.handle);

const listHouseOfQualityController = new ListHouseOfQualityController();
houseOfQualityRoutes.get("/", listHouseOfQualityController.handle);

export { houseOfQualityRoutes };
