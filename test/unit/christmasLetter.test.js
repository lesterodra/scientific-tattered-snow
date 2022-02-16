const { create } = require('../../api/controllers/christmasLetterController');
const { request, response, next } = require('../helpers');
const axios = require('axios');
jest.mock('axios');
const userProfiles = [
    {
        "userUid": "730b0412-72c7-11e9-a923-1681be663d3e",
        "address": "219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo",
        "birthdate": "2017/12/05"
    },
    {
        "userUid": "730b06a6-72c7-11e9-a923-1681be663d3e",
        "address": "365-1095, Minowada, Shirataka-machi Nishiokitama-gun, Yamagata",
        "birthdate": "1987/01/01"
    },
    {
        "userUid": "730b0804-72c7-11e9-a923-1681be663d3e",
        "address": "292-1082, Yodacho, Obihiro-shi, Hokkaido",
        "birthdate": "2010/23/01"
    }
];

const users = [
    {
        "username": "charlie.brown",
        "uid": "730b0412-72c7-11e9-a923-1681be663d3e"
    },
    {
        "username": "james.bond",
        "uid": "730b06a6-72c7-11e9-a923-1681be663d3e"
    },
    {
        "username": "bugs.bunny",
        "uid": "730b0804-72c7-11e9-a923-1681be663d3e"
    }
];
beforeAll(() => {
    global.pendingEmail = [];
});

it('it should not create christmas letter: no username', () => {
    return create(request({
        body: {}
    }), response(), next()).then(data => {
        expect(data).toStrictEqual({
            message: 'must have required property \'username\'',
        });
    });
});

it('it should not create christmas letter: no message', () => {
    return create(request({
        body: {
            username: 'james.bond',
        }
    }), response(), next()).then(data => {
        expect(data).toStrictEqual({
            message: 'must have required property \'message\'',
        });
    });
});

it('it should not create christmas letter: invalid username', () => {
    axios.get.mockReturnValueOnce({
        data: users,
    });
    return create(request({
        body: {
            username: 'someone',
            message: 'test',
        }
    }), response(), next()).then(data => {
        expect(data).toStrictEqual({
            message: 'user not found',
        });
    });
});

it('it should create christmas letter', () => {
    axios.get.mockReturnValueOnce({
        data: users,
    }).mockReturnValueOnce({
        data: userProfiles,
    });
    return create(request({
        body: {
            username: 'charlie.brown',
            message: 'test',
        }
    }), response(), next()).then(data => {
        expect(data).toStrictEqual({
            message: 'successful',
        });
    });
});