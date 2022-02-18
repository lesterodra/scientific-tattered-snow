const uuid = require('uuid');

const createChristmasLetter = ({ user: { username }, userProfile: { address }, message }) => {
    global.pendingEmail.push({
        id: uuid.v4(),
        username,
        address,
        message,
    });
};


module.exports = {
    createChristmasLetter,
};