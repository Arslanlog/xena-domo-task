import { prisma } from "../config/index.js";

class Order {

    async createOrder(data) {
        await prisma.order.create({
            data,
        })
    }

    async getOrder(where) {
        return await prisma.order.findFirst({
            where,
        })
    }
}

const orderService = new Order();

export {
    Order,
    orderService,
}