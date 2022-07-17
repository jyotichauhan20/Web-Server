const path = require('path')
const express = require('express')
const hbs = require('hbs')
const mapbox = require('./utils/mapboxapi')
const weathercast = require('./utils/weathercastapi')
// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname,'../public'))

const app = express()
const port = 3000
const localhost = 'localhost'

// Defining path for express config
const publicDirectry = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
// Set up handelbars and views location

app.set('view engine', 'hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static direcotry to serve
//  nodemon src/app.js -e js,hbs -e for extension
app.use(express.static(publicDirectry))
app.get('/help',(req, res)=>{
    res.render('help',{
        helptext:'This is help text',
        title:'Help',
        name:'Jyoti Chauhan'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About me',
        name:'Mohin chauhan',
        age:20
    })


})

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather',
        name:'Jyoti Chauhan',
        age:19
    })

})
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    mapbox.mapbox(req.query.address,(err,{latitude, longitude, location}={})=>{
        if(err){
            return res.send({ err:err })
        }
        weathercast.weathercast(latitude, longitude,(err, forecast)=>{
            if(err){
                return res.send({ err:err })
            }
            res.send({
                forecast:forecast,
                location,
                address:req.query.cityName
            })
        })
    })
    // res.send({
//         forecast:'It is snowing',
//         location:"India",
//         address:req.query.address
//         // additional information
//     })
})

app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            // we used return here why because we can use res.send only once time.
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})


app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'jyoti chauhan',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'Jyoti chauhan',
        errorMessage:'Page not found'
    })
})

// app.listen(3000,()=>{
//     console.log('Server is on port 3000')
// })
app.listen(port, localhost,()=>console.log(`Server is runing at http://${localhost}:${port}`))
