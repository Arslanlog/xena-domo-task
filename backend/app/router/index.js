import { Router } from "express";
import { ROUTES } from "../constants/index.js";
import { transaction, webhook } from "../controller/index.js";
import settlement from "../controller/settlement/index.js";

const router = Router();
router.use(ROUTES.TRANSACTION, transaction);
router.use(ROUTES.WEBHOOK, webhook);
router.use(ROUTES.SETTLEMENT, settlement);

export {
    router,
};