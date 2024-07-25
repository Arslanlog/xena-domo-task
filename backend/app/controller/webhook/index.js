import { Router } from "express";
import { transactionDetails } from "./webhook.js";
const webhook = Router();

webhook.post("/transaction-details", transactionDetails)

export {
    webhook,
}