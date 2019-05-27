'use strict'

// Environmnet variables
require('dotenv').config();

// Application Dependencies
const express = require('express');
const pg = require('pg');
const superagent = require('superagent');
// Use below if we want user to interact with DB
// const methodOverride = ('method-override');

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));

// Use below if we want user to interact with DB
// app.use(methodOverride((request, response) => {
//     if (request.body && typeof request.body === 'object' && '_method' in request.body) {
//         let method = request.body._method;
//         delete request.body._method;
//         return method;
//     }
// }))

// Database Setup
// const client = new pg.Client(process.env.DATABASE_URL);
// client.connect();
// client.on('error', err => console.error(err));

// View engine for server-side rendering template (EJS)
app.set('view engine', 'ejs');

// Listen for request to the server 
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// API Routes
app.get('/', loadHomePage);
app.post('/results', performSearch);
app.get('*', (request, response) => response.status(404).send('This route does not exist'));



// Request Handlers

function loadHomePage(request, response) {
    response.render('pages/index')

}

function performSearch(request, response) {
    let url = 'https://app-staging.forca.life/api/v1/nutrition/food/35556/';
 
    superagent.get(url)
        .then(apiResponse => {
            console.log('Console log of:', apiResponse.text());
            response.send(apiResponse.body.items)
        });
 
    // .then(response.render('pages/results'));
 }