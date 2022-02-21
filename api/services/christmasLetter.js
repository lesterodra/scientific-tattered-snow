const uuid = require('uuid');
const apiError = require('../apiError');
const User = require('./user');

class ChristmasLetter {
    constructor() {
        this.user = new User();
    }
    async create(data) {
        try {
            const { username, message } = data;
            const user = await this.user.getByUsername(username);
            if (!user) {
                apiError(404, 'user not found');
            }

            const userProfile = await this.user.getProfile(user.uid);
            if (this.user.getAge(userProfile.birthdate) >= 10) {
                apiError(400, 'age should be less than 10 years old'); 
            }
            global.pendingEmail.push({
                id: uuid.v4(),
                address: userProfile.address,
                username,
                message,
            });
        } catch(error) {
            throw error;
        }
    }
}

module.exports = ChristmasLetter;
