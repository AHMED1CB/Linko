import { Router } from "express";
import RequestController from "../Controllers/RequestsController.js";

const router = Router();

router.post( "/:userId/send" , RequestController.Send );



export default router