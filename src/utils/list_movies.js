const request = require('request')

const list_movies = ({limit=20, page=1, quality='all', minimum_rating=0, query_term='0', genre='all', sort_by='date_added', order_by='desc', with_rt_ratings=false}, callback)=>{
    const url = `https://yts.mx/api/v2/list_movies.json?limit=${limit}&page=${page}&quality=${quality}&minimum_rating=${minimum_rating}&query_term=${query_term}&genre=${genre}&sort_by=${sort_by}&order_by=${order_by}&with_rt_ratings=${with_rt_ratings}`
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
    list_movies
}