import { Router } from "express";
import RequestController from "../Controllers/RequestsController.js";

const router = Router();

router.get("/", RequestController.ShowRecivedRequests);
router.post("/:userId/send", RequestController.Send);

export default router;
