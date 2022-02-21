const axios = require('axios');

class User {
    async getByUsername(username) {
        try {
            return (await axios.get(`${process.env.JSON_URL}/alj-devops/santa-data/master/users.json`))
                .data
                .find(user => user.username === username);
        } catch(error) {
            throw error;
        }
    }

    async getProfile(uid) {
        try {
            return (await axios.get(`${process.env.JSON_URL}/alj-devops/santa-data/master/userProfiles.json`))
                .data
                .find(userProfile => userProfile.userUid === uid);
        } catch(error) {
            throw error;
        }
    }

    getAge(birthdate) {
        try {
            const currentYear = new Date().getFullYear();
            const birthdayYear = new Date(birthdate).getFullYear();
            return currentYear - birthdayYear;
        } catch(error) {
            throw error;
        }
        
    }
}

module.exports = User;
