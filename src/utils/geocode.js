const request = require('request');
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +
        '.json?access_token=pk.eyJ1Ijoic3VyeWFzNGhhbmEiLCJhIjoiY2tpZzg4bDI5MG01dTMwcWtqc3RkdWVudCJ9.YYT7kpYoFGqhbKJ2PcCfsg';
        request({ url, json: true }, (error, { body } ) => {
        if (error) {
            callback('Unable to connect location services', undefined);
        } else if ( body.features.length === 0) {
            callback('There is no location as per the query', undefined);
        } else {           
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                place_name: body.features[0].place_name
            })
        }
    });
}

const forecast = (latitude, longitude, place_name, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5d6ebc792134de9767e2771057212025&query='
        + longitude + ',' + latitude;
    request({ url, json: true }, (error, { body }) => {
        // write logic after forcast response is recieved
        if (error) {
            callback('cannot connect to the forecast server', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined);
        } else {
            callback(undefined, {
                observation_time: body.current.observation_time,
                temperature: body.current.temperature,
                humidity: body.current.humidity,
                location: place_name,
                weather : body.current.weather_descriptions,
                wind_speed : body.current.wind_speed,
                wind_dir : body.current.wind_dir,
                wind_degree : body.current.wind_degree,
                feelslike : body.current.feelslike
            });        }
    })
}

module.exports = {
    geocode: geocode,
    forecast: forecast
};