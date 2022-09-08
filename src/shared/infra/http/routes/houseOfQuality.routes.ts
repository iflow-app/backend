import { Router } from "express";

import { CreateHouseOfQualityController } from "../../../../modules/requirements/useCases/createHouseOfQuality/CreateHouseOfQualityController";

const houseOfQualityRoutes = Router();

const createHouseOfQualityController = new CreateHouseOfQualityController();
houseOfQualityRoutes.post("/", createHouseOfQualityController.handle);

export { houseOfQualityRoutes };
