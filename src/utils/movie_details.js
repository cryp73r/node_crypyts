const request = require('request')

const movie_details = ({movie_id, with_images=false, with_cast=false}, callback)=>{
    const url = `https://yts.mx/api/v2/movie_details.json?movie_id=${movie_id}&with_images=${with_images}&with_cast=${with_cast}`
    request.get({url, json: true}, (error, {body}={})=>{
        if (error) {
            return callback('Unable to connect to YTS.MX', undefined)
        } else if (!body) {
            return callback('Invalid movie_id', undefined)
        }
        callback(undefined, body)
    })
}

module.exports = {
    movie_details
}