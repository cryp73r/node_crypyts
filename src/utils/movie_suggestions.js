const request = require('request')

const movie_suggestions = (movie_id, callback)=>{
    const url = `https://yts.mx/api/v2/movie_suggestions.json?movie_id=${movie_id}`
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
    movie_suggestions
}