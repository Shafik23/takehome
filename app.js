"use strict";

const fs = require('fs');
const express = require('express');
const request = require('request');
const app = express();
const bodyParser = require('body-parser');


let globalResponse = {twitter: [], facebook: [], instagram: []};

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

function log(...args) {
    const DEBUG = true;
    if (DEBUG) {
        console.log(...args);
    }
}


app.get('/', function (req, res) {
    request('https://takehome.io/twitter', {json: true}, (err, res, body) => {
        log('Twitter:');
        if (err) { 
            log('Error: ', err); 
        }
        log(body);

        globalResponse.twitter = body;
    });

    request('https://takehome.io/facebook', {json: true}, (err, res, body) => {
        log('Facebook:');
        if (err) { 
            log('Error: ', err); 
        }
        log(body);

        globalResponse.facebook = body;
    });

    request('https://takehome.io/instagram', {json: true}, (err, res, body) => {
        log('Instagram:');
        if (err) { 
            log('Error: ', err); 
        }
        log(body);

        globalResponse.instagram = body;
    });

    res.json(globalResponse);
});


app.listen(3000, function () {
    log('Social Network Aggregator, at your service ...');
});
