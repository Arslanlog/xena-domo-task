import { validationResult } from "express-validator";
import { STATUS_CODE } from "../../constants/statusCode.js";
import settlementService from "../../services/settlement.js"

export const createSettlement = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(STATUS_CODE.BAD_REQUEST)
                .json({
                    errors: errors.array(),
                });
        }
        const data = await settlementService.createSettlement({
            ...req.body,
            status: "SUCCESS",
            refrence_id: "3432",
            merchant_id: "979c2d0f-6a1c-4ca1-a891-963eb156c32f"
        });
        res.json({
            message: "Settlement created successfully",
            data,
        })
    } catch (err) {
        next(err);
    }
}


export const getSettlement = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(STATUS_CODE.BAD_REQUEST)
                .json({
                    errors: errors.array(),
                });
        }
        const { page, take: qTake, id, merchant_id, status, amount, acc_no, method, reference_id } = req.query;
        const take = Number(qTake) || 10;
        const skip = take * (Number(page || 1) - 1);
        const data = await settlementService.getSettlement(skip, take, id, merchant_id, status, amount, acc_no, method, reference_id);
        res.json({
            message: "Settlement fetched successfully!",
            ...data,
        })
    } catch (err) {
        next(err);
    }
}