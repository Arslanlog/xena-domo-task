const TransactionSessions = new Map();
class Transaction {

    async initiateTransaction(data) {
        const { uuid } = data;
        const _10_MINT = 1000 * 60 * 10;
        // const _10_MINT = 1000 * 30;
        const expirationDate = new Date(new Date().getTime() + _10_MINT).toISOString();
        const payload = {
            ...data,
            expirationDate,
        }
        TransactionSessions.set(uuid, payload, _10_MINT);
        setTimeout(() => {
            TransactionSessions.delete(uuid);
        }, _10_MINT);
        return payload;
    }

    async getTransactionSession(uuid) {
        return TransactionSessions.get(uuid);
    }

    async processTransaction(data) {

        const failed = {
            status: "failed",
            merchantOrderId: "d76cc565-2068-42b4-957e-27dca5121b24",
            payinId: data.uuid,
            amount: data.amount,
        }

        const dropped = {
            status: "dropped",
            merchantOrderId: "454c0d50-84d2-42b1-974e-7dd0cf0a312d",
            payinId: data.uuid,
            amount: data.amount,
        }

        const success = {
            status: "success",
            merchantOrderId: "94532ad1-5c1e-4d95-8917-822de5ec5ed4",
            payinId: data.uuid,
            paymentId: "test-238ef613-e5bc-40da-a3dd-5127280",
            amount: data.amount,
        }

        // remove session
        TransactionSessions.delete(data.uuid);
        return success;
    }
}

const transactionService = new Transaction();
export {
    transactionService,
    Transaction,
}