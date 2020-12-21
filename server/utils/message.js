let generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
}

let generateLocation = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        latitude,
        longitude,
        createdAt: new Date().getTime()
    }
}

module.exports = {generateMessage, generateLocation}