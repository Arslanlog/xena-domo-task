import { Router } from "express";
import { initiateTransaction, validateSession, processTransaction } from "./transaction.js";

const transaction = Router();
transaction.post("/", initiateTransaction);
transaction.post("/validate/:uuid", validateSession);
transaction.post("/process/:uuid", processTransaction);
export { transaction };