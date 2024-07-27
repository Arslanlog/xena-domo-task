import { Router } from "express";
import { createSettlement, getSettlement } from "./settlement.js";
import * as validations from "../../helpers/settlementValidation.js";
const settlement = Router();

settlement.post("/", validations.createSettlement(), createSettlement)
settlement.get("/", validations.getSettlement(), getSettlement)

export default settlement;