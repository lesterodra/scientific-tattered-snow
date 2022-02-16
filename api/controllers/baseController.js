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

}

module.exports = BaseController;