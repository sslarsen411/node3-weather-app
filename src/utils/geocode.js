const request   = require('postman-request')
const constants = require('./const.js')

const geocode = (address, callback) => {
    
    const url = constants.geocode_url + encodeURIComponent(address) + '.json?access_token=' + constants.map_docs
   
    request(url, {json:true}, function (error, {body} = {}) {
        if (error) {
            callback('Sorry, unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }        
    })

}

module.exports = geocode