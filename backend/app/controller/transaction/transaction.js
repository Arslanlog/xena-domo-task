import { v4 as uuidv4 } from 'uuid'
import axios from "axios"
import { CustomError } from "../../utils/index.js"
import { STATUS_CODE } from "../../constants/index.js"
import { orderService, transactionService } from "../../services/index.js"

export const initiateTransaction = async (req, res) => {
    const uuid = uuidv4();
    const data = await transactionService.initiateTransaction({
        uuid,
        ...req.body,
    })

    console.log(data);


    res.json({
        message: "Success",
        data,
    })
}

export const validateSession = async (req, res) => {
    const { uuid } = req.params;
    const data = await transactionService.getTransactionSession(uuid);

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

    res.json({
        message: "Success",
        data,
    })
}

export const processTransaction = async (req, res) => {
    const { utrNumber, amount } = req.body;
    const { uuid } = req.params;

    const data = await transactionService.getTransactionSession(uuid);
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

    const transactionRes = await transactionService.processTransaction({
        ...req.body,
        uuid,
    })

    await orderService.createOrder({
        amount: Number(amount),
        // due to lack of payload i just hard coded here
        userId: 1,
        uuid,
    })

    res.json({
        message: "Success",
        data: transactionRes,
    })

    // if transaction is successfull
    // hit notify url
    // await axios.post("http://anydomain.com/webhook/", success)
    // .catch(err=>{});
}