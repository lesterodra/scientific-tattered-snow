const { getByUsername, getProfile, getAge } = require('../services/user');
const { createChristmasLetter } = require('../services/christmasLetter');
const baseController = require('./baseController');
class ChristmasLetterController extends baseController {
    constructor() {
        super();
    }

    async create(req, res, next) {
        try {
            console.log(this);
            const validate = this.validateRequest({
                type: 'object',
                properties: {
                  username: { type: 'string' },
                  message: { type:'string' },
                },
                required: ['username', 'message'],
            }, req.body);

            if (!validate.isValid) {
                return res.status(400).json({
                    message: validate.message,
                });
            }

            const { username, message } = req.body;
            const user = await getByUsername(username);
            if (!user) {
                return res.status(404).json({
                    message: 'user not found',
                });
            }

            const userProfile = await getProfile(user.uid);
            if (getAge(userProfile.birthdate) >= 10) {
                return res.status(400).json({
                    message: 'age should be less than 10 years old',
                });
            }
            createChristmasLetter({ user, userProfile, message });

            return res.json({
                message: 'successful',
            });
        } catch(error) {
            console.error(error);
            return res.status(500).json({
                message: 'internal server error',
            });
        }
    }
}

const ChristmasLetter = new ChristmasLetterController();
module.exports = {
    create: (req, res, next) => ChristmasLetter.create(req, res, next),
};