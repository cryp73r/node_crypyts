const request = require('request')

const images = (url, callback)=>{
    request.get({url, encoding: null}, (error, {body}={})=>{
        if (error) {
            return callback('Unable to connect to YTS.MX', undefined)
        } else if (!body) {
            return callback('Invalid URL!')
        }
        callback(undefined, body)
    })
}

module.exports = {
    images
}