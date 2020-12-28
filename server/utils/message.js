let moment = require('moment');

let generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment.valueOf()
    }
}

let generateLocation = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        latitude,
        longitude,
        createdAt: moment.valueOf()
    }
}

module.exports = {generateMessage, generateLocation}