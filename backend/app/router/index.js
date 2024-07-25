import { Router } from "express";
import { ROUTES } from "../constants/index.js";
import settlement from "../controller/settlement/index.js";

const router = Router();
router.use(ROUTES.SETTLEMENT, settlement);

export {
    router,
};