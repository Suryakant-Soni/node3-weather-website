const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const oWeather = require('./utils/geocode.js'); 

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// set-up handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//getting port number set dynamically
const port = process.env.PORT || 3000 ;

//Setup directory to serve static files
app.use(express.static(publicDirectoryPath));

app.get('', (req,res)=>{
res.render('index', {
    title: 'Weather Application',
    identifier : 'Weather',
    name: 'suryakant soni'
});
});

app.get('/about', (req, res)=>{
res.render('about', {
    title : 'This is About Page',
    identifier : 'About',
    name : 'Suryakant Soni'
})
});

app.get('/help', (req, res)=>{
    res.render('help', {
        title : 'This is Help Page',
        identifier : 'Help',
        name : 'Suryakant Soni'
    })
    });

// Weather route
app.get('/weather', (req,res) => {

// if address is not sent from the query parameter in the request URL
if (!req.query.address) {
 return  res.send({
        error : 'Please send address as parameter in the request'
    });
}

const address = req.query.address;

oWeather.geocode( address, (error, { latitude, longitude, place_name } = {} ) => {
    if (latitude && longitude) {
        oWeather.forecast(latitude, longitude, place_name, (error,data) => {
        if (data) {
        // write code for printing final data 

        return  res.send({
            location : data.location,
            forecast : data.weather,
            observation_time: data.observation_time,
            temperature: data.temperature,
            humidity: data.humidity,
            wind_speed : data.wind_speed,
            wind_dir : data.wind_dir,
            wind_degree : data.wind_degree,
            feelslike : data.feelslike
        });

        } else if (error){     
            return  res.send({
                error : error
            });           
        }
    });
} else {
    return  res.send({
        error : 'Error in connecting Geocode server'
    });
}
});

})

//Help Child pages
app.get('/help/*', (req, res) => {
res.render('404page',{
    pageName : 'Help'
});
});
// not found page
app.get('*', (req, res)=>{
res.render('404page',{
    pageName : 'Clueless'
});
});
app.listen(port, () => {
    console.log('Server is running up on port ' + port);
});