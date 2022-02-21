const christmasLetter = require('../services/christmasLetter');
const baseController = require('./baseController');
class ChristmasLetterController extends baseController {
    constructor() {
        super();
        this.christmasLetter = new christmasLetter();
    }

    async create(req, res, next) {
        try {
            await this.christmasLetter.create(req.body);

            return res.json({
                message: 'successful',
            });
        } catch(error) {
            return this.throwError(error, res);
        }
    }
}

const ChristmasLetter = new ChristmasLetterController();
module.exports = {
    create: (req, res, next) => ChristmasLetter.create(req, res, next),
};