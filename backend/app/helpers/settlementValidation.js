import { body, query } from 'express-validator';
import ifsc from "ifsc";

const methodEnums = ["BANK", "CASH", "CRYPTO", "AED"];
const walletEnums = ["WALLET1", "WALLET2", "WALLET3"];
const statusEnums = ["SUCCESS", "ASSIGNED", "DROPPED"];

export const createSettlement = () => ([
    body("code")
        .trim()
        .notEmpty()
        .withMessage("Code is required!"),
    body("amount")
        .trim()
        .notEmpty()
        .withMessage("Amount is required!")
        .isNumeric()
        .withMessage("Amount is invalid!"),
    body("method")
        .trim()
        .notEmpty()
        .withMessage("Method should be provided!")
        .custom((method, meta) => {
            if (!methodEnums.includes(method)) {
                return Promise.reject(`Method is invalid! Should be one of these ${methodEnums}`)
            }
            const body = meta.req.body;
            let validateFields = [];
            switch (method) {
                case "CRYPTO":
                    validateFields = ["wallet", "wallet_address"];
                    break;
                case "BANK":
                    validateFields = ["acc_name", "acc_no", "ifsc"];
                    break;
            }
            for (const field of validateFields) {
                const value = body[field];
                if(!value || typeof value === "string" && !value.trim()){
                    return Promise.reject(`${field} is required!`);
                }
                if(field == "ifsc" && !ifsc.validate(value)){
                    return Promise.reject(`ifsc is invalid!`);
                }
                if(field == "wallet" && !walletEnums.includes(value)){
                    return Promise.reject(`Wallet is invalid! Should be one of these ${walletEnums}`);
                }
            }
            return Promise.resolve();
        }),
])

export const getSettlement = () => ([
    query("id")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Id is required!"),
    query("status")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("status is required!")
    .isIn(statusEnums)
    .withMessage(`Invalid status, Should be one of these ${statusEnums}`),
    query("method")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("method is required!")
    .isIn(methodEnums)
    .withMessage(`Invalid method, Should be one of these ${methodEnums}`),
    query("reference_id")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("reference_id is required!"),
    query("acc_no")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("acc_no is required!"),
    query("amount")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("amount is required!")
    .isNumeric()
    .withMessage("amount is invalid!"),
    query("merchant_id")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("merchant_id is required!"),
    query("page")
    .optional()
    .notEmpty()
    .isNumeric()
    .isInt({ min: 0 })
    .withMessage("Invalid page!"),
    query("take")
    .optional()
    .notEmpty()
    .isNumeric()
    .isInt({ min: 1 })
    .withMessage("Invalid take"),
])