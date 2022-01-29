const express = require('express')
const hbs = require('hbs')
const movie_suggestions = require('./utils/movie_suggestions')
const movie_details = require('./utils/movie_details')
const list_movies = require('./utils/list_movies')

const app = express()
const port = process.env.PORT || 3000

app.get('', (req, res)=>{
    res.send({
        home: 'Home',
        name: 'CRYP73R'
    })
})

app.get('/list_movies', (req, res)=>{
    const limit=req.query.limit || 20
    const page=req.query.page || 1
    const quality=req.query.quality || 'all'
    const minimum_rating=req.query.minimum_rating || 0
    const query_term=req.query.query_term || '0'
    const genre=req.query.genre || 'all'
    const sort_by=req.query.sort_by || 'date_added'
    const order_by=req.query.order_by || 'desc'
    const with_rt_ratings=req.query.with_rt_ratings || false
    list_movies.list_movies({limit, page, quality, minimum_rating, query_term, genre, sort_by, order_by, with_rt_ratings}, (error, moviesData)=>{
        if (error) {
            return res.send({
                status: 'error',
                status_message: error
            })
        }
        res.send(moviesData)
    })
})

app.get('/movie_details', (req, res)=>{
    const movie_id = req.query.movie_id
    const with_images = req.query.with_images || false
    const with_cast = req.query.with_cast || false
    if (!movie_id) {
        return res.send({
            status: 'error',
            status_message: 'movie_id is null'
        })
    }
    movie_details.movie_details({movie_id, with_images, with_cast}, (error, movieDetails)=>{
        if (error) {
            return res.send({
                status: 'error',
                status_message: error
            })
        }
        res.send(movieDetails)
    })
})

app.get('/movie_suggestions', (req, res)=>{
    const movie_id = req.query.movie_id
    if (!movie_id) {
        return res.send({
            status: 'error',
            status_message: 'movie_id is null'
        })
    }
    movie_suggestions.movie_suggestions(movie_id, (error, moviesData)=>{
        if (error) {
            return res.send({
                status: 'error',
                status_message: error
            })
        }
        res.send(moviesData)
        
    })
})

app.listen(port, ()=>{
    console.log(`Server is running up at port ${port}.`)
})