const request = require('postman-request')
const api_key = 'b6fde360299ad18e76ec274630c1d810';
lat = 40.714;
lng = -74.006;

getWeather = (lat, lng)=>{
    return new Promise((resolve, reject) =>{
        request({
            url: `http://api.weatherstack.com/current?access_key=${api_key}&query=${lat},${lng}`,
            json: true
        }, (error, response, body) =>{
            if (!error && response.statusCode === 200){
                resolve(body.current);
            } else{
                reject('Unable to fetch data');
            };
        });
    }
    )};

module.exports = {
    getWeather
}
