
const req = require("postman-request")

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=ec583d4281cf67430edccb134190b64c&query=${lat},${long}&units=f`

    req({ url, json:true }, (err, {body}) => {
        if (err) {
            s = 'Unable to connect to weather service!'
            callback(s, undefined)
        } else if (body.error) {
            s = 'Unable to find location!'
            callback(s, undefined)
        } else {
            const cur = body.current
            data = {
                weather_desc: cur.weather_descriptions[0], 
                temp: cur.temperature,
                feelslike: cur.feelslike,
                humidity: cur.humidity,
            }
            callback(undefined, data)
        }
    })
}

module.exports = forecast