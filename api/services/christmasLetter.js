const uuid = require('uuid');


module.exports = {
    createChristmasLetter: ({ user: { username }, userProfile: { address }, message }) => {
        global.pendingEmail.push({
            id: uuid.v4(),
            username,
            address,
            message,
        });
    }
};