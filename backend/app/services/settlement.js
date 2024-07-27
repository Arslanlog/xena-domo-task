import { prisma } from "../config/index.js";

class Settlement {

    async createSettlement(body) {
        return await prisma.settlement.create({
            data: body,
        })
    }

    async getSettlement(skip, take, id, merchant_id, status, amount, acc_no, method, reference_id) {

        const where = {};
        [
            { col: "id", value: id },
            { col: "merchant_id", value: merchant_id },
            { col: "status", value: status },
            { col: "amount", value: amount },
            { col: "acc_no", value: acc_no },
            { col: "method", value: method },
            { col: "reference_id", value: reference_id },
        ]
            .forEach(el => {
                if (el.value) {
                    where[el.col] = el.value;
                }
            })

        const data = await prisma.settlement.findMany({
            where,
            skip,
            take,
        })
        const total = await prisma.settlement.count({
            where
        })

        return {
            data,
            total,
        }
    }
}

export default new Settlement();