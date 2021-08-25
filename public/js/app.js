console.log("Client side js file is loaded")

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const msg01 = document.querySelector("#msg01")
const msg02 = document.querySelector("#msg02")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault() // to prevent the default behavior: refresh the webpage in this case
    const loc = search.value
    if (!loc) {
        return console.log("you must provide a location")
    }
    msg01.textContent = "Loading..."
    msg02.textContent = ""

    fetch(`/weather?address=${loc}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                msg01.textContent = "Please input a correct location"
                return
            }
            const weather = data.forecast.weather_desc
            const temp = data.forecast.temp
            const feelslike = data.forecast.feelslike
            const hum = data.forecast.humidity
            msg01.textContent = `location: ${data.location}`
            msg02.textContent = `current weather=[${weather}], temperature=[${temp}], feels like=[${feelslike}], humidity=[${hum}]`
        })
    })

})