const request   = require('postman-request')
const constants = require('./const.js')

const forecast = (latitude, longitude, callback) => {  
    const url = constants.forecast_url + constants.action + constants.api_key + constants.query + latitude + ',' + longitude
    git
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to get a weather forecast for this location', undefined)
        } else {
            callback(undefined, 
                body.current.weather_descriptions[0] + ". It is currently " + 
                body.current.temperature + " degress out. " +
                'Wind git speed and direction is ' + body.current.wind_speed + ' mph ' + body.current.wind_dir + '.')
        }
    })
}

module.exports = forecast