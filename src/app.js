const path = require("path")
const exp = require("express")
const app = exp()
const hbs = require("hbs")
const forecast = require("./utils/forecast")
const geocode = require("./utils/geocode")
const port = process.env.PORT || 3000

// console.log(__dirname)
console.log(__filename)
staticPath = path.join(__dirname, "../public")
app.use(exp.static(staticPath))

// setup handlebars engine and views location
app.set("view engine", "hbs")
const viewsPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

app.set("views", viewsPath)
hbs.registerPartials(partialPath)

app.get("", (req, res) => {
    res.render("index", {
        title: "WEATHER",
        name: "Sean",
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "ABOUT",
        name: "Sean",
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "HELP",
        name: "Sean",
        msg: "This is a helpful message",
    })
})

// localhost:3000/weather
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }

    geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
        if (err) {
            return res.send({"error":err})
        }
        forecast(latitude, longitude, (err, forecastdata) => {
            if (err) {
                return console.log(err)
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "help not found",
        name: "Sean",
        message: "help page not found",
    })
})

// * need to be the last, match any unsupported page path
app.get("*", (req, res) => {
    res.render("404", {
        title: "404 not found",
        name: "Sean",
        message: "help page not found",
    })
})

app.listen(port, ()=> {
    console.log(`Server is up on port ${port}`)
})