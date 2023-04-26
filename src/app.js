// Module imports
const path = require('path')
const express = require('express')
const hbs = require('hbs')

// Local imports
const movie_suggestions = require('./utils/movie_suggestions')
const movie_details = require('./utils/movie_details')
const list_movies = require('./utils/list_movies')
const images = require('./utils/images')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Request handlers
app.get('', (req, res)=>{
    res.render('index', {
        title: 'Home',
        author: 'CRYP73R'
    })
})

app.get('/healthz', (req, res)=>{
    res.status(200).send({
        status: 'success',
        status_message: 'Health is OK'
    })
})

app.get('/documentation', (req, res)=>{
    res.send({
        status: 'success',
        status_message: 'Query was Successful'
    })
})

app.get('/api/list_movies', (req, res)=>{
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

app.get('/api/movie_details', (req, res)=>{
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

app.get('/api/movie_suggestions', (req, res)=>{
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

app.get('/api/images', (req, res)=>{
    const url = req.query.url.replace(/\\/g, '')
    if (!url) {
        return res.send({
            status: 'error',
            status_message: 'Image URL required!'
        })
    }
    images.images(url, (error, imageData)=>{
        if (error) {
            return res.send({
                status: 'error',
                status_message: error
            })
        }
        res.set('Content-Type', 'image/jpeg')
        res.send(imageData)
    })
})

app.get('/api/*', (req, res)=>{
    res.render('404', {
        title: '404 API not found',
        author: 'CRYP73R'
    })
})

app.get('/*', (req, res)=>{
    res.render('404', {
        title: '404 Page not found',
        author: 'CRYP73R'
    })
})

app.listen(port, ()=>{
    console.log(`Server is running up at port ${port}.`)
})