const transaction = require("express").Router();
const { initiateTransaction, validateSession, processTransaction } = require("./transaction");
transaction.get("/", initiateTransaction);
transaction.post("/validate/:uuid", validateSession);
transaction.post("/process/:uuid", processTransaction);
module.exports = transaction;