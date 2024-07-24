import { Router } from "express";
import { ROUTES } from "../constants/index.js";
import { transaction, webhook } from "../controller/index.js";

const router = Router();
router.use(ROUTES.TRANSACTION, transaction);
router.use(ROUTES.WEBHOOK, webhook);

export {
    router,
};