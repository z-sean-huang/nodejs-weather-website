const req = require("postman-request")

const geocode = (address, callback) => {
    const MAPBOX_API = "pk.eyJ1IjoiaHpoaXNoZW45IiwiYSI6ImNrc3BsZWtzMTAzenAyd21icjJubHo3MGIifQ.5nE6UTAUkZ_NHO5b_4K7bQ"
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_API}&limit=1`
    // encodeURICompont() is to deal with special sign like "?" in address
    req({ url, json:true }, (err, {body}) => {
        if (err) {
            callback("Unable to connect to location services!", undefined)
        } else if (body.features.length===0) {
            callback("Unable to find the location!", undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name,
            })
        }
    })

}

module.exports = geocode