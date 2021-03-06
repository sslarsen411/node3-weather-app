const path    = require('path')
const express = require('express')
const hbs     = require('hbs')
const app     = express()
const geocode  = require('./utils/geocode')
const forecast = require('./utils/forecast')
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath           = path.join(__dirname, '../templates/views')
const partialsPath        = path.join(__dirname, '../templates/partials')

const port = process.env.PORT || 3000 // for deployment on heroku
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index',{
        title:"Scott's Weather App",
        name: 'Scott Larsen'        
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title:"About This App",
        name: 'Scott Larsen' 
    })
})
app.get('/help',(req, res) => {
    res.render('help',{
        title:"Need Help?",
        msg:'This is helpful text because help should help.',
        name: 'Scott Larsen' 
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
        return res.send({ // STOP 2nd send below
            error:'You must provide an address'
        })
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error)
                return res.send({
                    error: error
                })
            forecast(latitude, longitude, (error, forecastData) => {
                if(error)
                    return res.send({
                        error: error
                    })      
                return res.send({
                    title: 'The weather for ' + location,
                    forecast: forecastData
                })  
               
            })
        })
   
})

app.get('/products', (req, res) => {
    if(!req.query.search)
        return res.send({ // STOP 2nd send below
            error:'You must provide a search term'
        })
    console.log(req.query)
    res.send({
        products:[]
    })
})
// ERROR Pages
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Scott',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Error 404. Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})