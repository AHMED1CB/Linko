import { Router } from "express";
import RequestController from "../Controllers/RequestsController.js";

const router = Router();

router.get("/", RequestController.ShowRecivedRequests);
router.post("/:userId/send", RequestController.Send);
router.post("/:userId/accept", RequestController.Accept);

router.post("/:userId/reject", RequestController.Reject);

export default router;
