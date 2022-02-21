const ajv = new (require('ajv'))();

class BaseController {
    constructor() {}

    validateRequest(schema, json) {
        const validate = ajv.compile(schema);
        return {
            isValid: validate(json),
            message: validate.errors ? validate.errors[0].message : null,
        };
    }

    throwError(error, res) {
        let statusCode = 500;
        let errorMessage = 'something went wrong';
        if (error.statusCode) {
            statusCode = error.statusCode;
            errorMessage = error.message;
        }

        return res.status(statusCode).json({
            message: errorMessage,
        });
    }

}

module.exports = BaseController;