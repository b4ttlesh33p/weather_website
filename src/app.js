const path = require('path')
const express = require('express');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const mypath = (path.join(__dirname, '../public'));
console.log(mypath)

const app = express();

app.set('view engine', 'hbs')
app.use(express.static(mypath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'yo',
        name: 'Dan'
    });
});

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About',
        pic: "/img/pic.png"
    });
});

app.get('/help', (req, res) =>{
    res.render('help', {
        help: 'Help!'
    })
})

app.get('/weather', (req, res) =>{
    if (!req.query.search){
        return res.send({
            error: 'you must provide a search'
        });
    } else{
        const place = geocode.forecast(req.query.search);
        place.then(
            (data) =>{
                console.log(data)
                forecast.getWeather(data.lat, data.lng)
                .then(
                    (temp) => {
                        console.log(temp)
                        res.send(temp)
                    }
                ).catch(
                    (error) => {
                        res.send({
                            'error': error
                        })})
            }
        )
        .catch(
            (error) => {
                res.send({
                    'error': error
                })
            }
        );
    }
});

app.get('/products', (req, res) =>{
    if (!req.query.search){
        return res.send({
            error: 'you must provide a search'
        });
    } else{
        console.log(req.query.search);
        res.send({
            prodacts:[]
        })
    };
});


app.listen(3000, () => {
    console.log('server is up on port 3000');
});