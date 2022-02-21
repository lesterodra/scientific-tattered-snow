module.exports = router => {
    const christmasLetterController = require('../controllers/christmasLetterController');
    const ajv = new (require('ajv'))();
    const validateRequest = (req, res, next) => {
        const validate = ajv.compile({
            type: 'object',
            properties: {
              username: { type: 'string' },
              message: { type:'string' },
            },
            required: ['username', 'message'],
        });

        if (!validate(req.body)) {
            return res.status(400).json({
                message: validate.errors[0].message,
            });
        }
        next();
    };

    router.post('/christmas-letters', validateRequest, christmasLetterController.create);
};
