const axios = require('axios');

module.exports = {
    getByUsername:
        async username => {
            return (await axios.get(`${process.env.JSON_URL}/alj-devops/santa-data/master/users.json`))
            .data.find(user => user.username === username)},
    getProfile: 
        async uid => 
            (await axios.get(`${process.env.JSON_URL}/alj-devops/santa-data/master/userProfiles.json`))
            .data.find(userProfile => userProfile.userUid === uid),
    getAge: birthdate => {
        const currentYear = new Date().getFullYear();
        const birthdayYear = new Date(birthdate).getFullYear();
        return currentYear - birthdayYear;
    },
};