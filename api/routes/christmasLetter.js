module.exports = router => {
    const christmasLetterController = require('../controllers/christmasLetterController');
    router.post('/christmas-letters', christmasLetterController.create);
};