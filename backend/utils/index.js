const bcryptjs = require('bcrypt');

class CustomError extends Error {
    constructor(message, statusCode = 500, additionalInfo = {}) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.error = additionalInfo;

        // Capturing the stack trace keeps the reference to your error class
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

const bcrypt = {
    hash: (password)=> bcryptjs.hashSync(password, 10),
    compare: (password, hash)=> bcryptjs.compareSync(password, hash),
}

module.exports = {
    CustomError: CustomError,
    bcrypt,
}