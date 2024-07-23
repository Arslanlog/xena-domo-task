const dayjs = require("dayjs");
const { v4: uuidv4 } = require('uuid');
const prisma = require("../../config");
const axios = require("axios");
const { CustomError } = require("../../utils");
const { STATUS_CODE } = require("../../constants");

module.exports.initiateTransaction = async (req, res) => {
    // const expirationDate = dayjs().add(30, "minute").toISOString();
    const expirationDate = dayjs().add(1, "minute").toISOString();
    const uuid = uuidv4();
    const data = await prisma.transactionSession.create({
        data: {
            uuid,
            expirationDate,
            // currently hard coded because i've not maintain auth module
            userId: 1,
        }
    })
    res.json({
        message: "Success",
        data,
    })
}

module.exports.validateSession = async (req, res) => {
    const { uuid } = req.params;
    const data = await prisma.transactionSession.findUnique({
        where: {
            uuid,
        },
    })

    if (!data) {
        throw new CustomError("Invalid Session!", STATUS_CODE.FORBIDDEN, {
            status: STATUS_CODE.FORBIDDEN,
        });
    }

    const orderDetails = await prisma.order.findFirst({
        where: {
            uuid
        }
    })

    if (orderDetails) {
        return res.json({
            message: "Your order has already been processed!",
            data: orderDetails,
        })
    }

    const isExpire = new Date(data.expirationDate) < new Date();
    if (isExpire) {
        throw new CustomError("Session Expire!", STATUS_CODE.FORBIDDEN, {
            status: STATUS_CODE.FORBIDDEN,
        });
    }

    const bankDetails = await prisma.bankDetails.findUnique({
        where: {
            userId: data.userId,
        }
    })

    res.json({
        message: "Success",
        data: bankDetails,
    })
}

module.exports.processTransaction = async (req, res) => {
    const { utrNumber, amount } = req.body;
    const { uuid } = req.params;

    const data = await prisma.transactionSession.findUnique({
        where: {
            uuid,
        },
    })

    if (!data) {
        throw new CustomError("Invalid Session!", STATUS_CODE.FORBIDDEN, {
            status: STATUS_CODE.FORBIDDEN,
        });
    }

    const isExpire = new Date(data.expirationDate) < new Date();
    if (isExpire) {
        throw new CustomError("Session Expire!", STATUS_CODE.FORBIDDEN, {
            status: STATUS_CODE.FORBIDDEN,
        });
    }
    // process the order and get marchant order, pay in and payment id's

    await prisma.order.create({
        data: {
            amount: Number(amount),
            userId: data.userId,
            uuid,
        }
    })

    const failed = {
        status: "failed",
        merchantOrderId: "d76cc565-2068-42b4-957e-27dca5121b24",
        payinId: "b50f523a-c58a-48dd-b8a4-eb85881760bb",
        amount,
    }

    const dropped = {
        status: "dropped",
        merchantOrderId: "454c0d50-84d2-42b1-974e-7dd0cf0a312d",
        payinId: "4088ca53-e163-4985-b191-c77434c1711d",
        amount,
    }

    const success = {
        status: "success",
        merchantOrderId: "94532ad1-5c1e-4d95-8917-822de5ec5ed4",
        payinId: "a09f788d-fd62-48de-80d6-ca01c934d9c4",
        paymentId: "test-238ef613-e5bc-40da-a3dd-5127280",
        amount,
    }

    res.json({
        message: "Success",
        data: success,
    })

    // if transaction is successfull
    // hit notify url
    // await axios.post("http://anydomain.com/webhook/", success)
    // .catch(err=>{});
}