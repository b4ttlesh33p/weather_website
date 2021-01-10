const request = require('postman-request')


const geocodeAddress = (address, callback) =>{
    const encoded_uri = encodeURIComponent(address)
    const api_key= 'AIzaSyBWWUJHtel9usCnjpxRjriW5e-UYRHrym4'

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded_uri}&key=${api_key}`,
        json: true
    }, (error, response, body) =>{
        if (error){
            callback('unable to connect')
        }else if (body.status==='ZERO_RESULTS'){
            callback('no results')
        }else if (body.status=== "OK"){
        callback(undefined, {
            address: body.results[0].formatted_address,
            lat: body.results[0].geometry.location.lat,
            lng: body.results[0].geometry.location.lng 
        })
        }
    })
}

const forecast = (location) =>{
    const encoded_uri = encodeURIComponent(location);
    const api_key= 'AIzaSyBWWUJHtel9usCnjpxRjriW5e-UYRHrym4';

    return new Promise((resolve, reject) =>{
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded_uri}&key=${api_key}`,
            json: true,
            }, (error, response, body) =>{
            if (error){
                reject('unable to connect')
            } else if (body.status === 'ZERO_RESULTS'){
                reject('no results')
            } else {
                resolve ({
                    address: body.results[0].formatted_address,
                    lat: body.results[0].geometry.location.lat,
                    lng: body.results[0].geometry.location.lng 
                   }
                )}
            })})}

module.exports = {
    geocodeAddress,
    forecast
}
