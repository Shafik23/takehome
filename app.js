"use strict";

const fs = require('fs');
const express = require('express');
const request = require('request');
const app = express();
const bodyParser = require('body-parser');


let globalResponse = {twitter: [], facebook: [], instagram: []};

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
    request('https://takehome.io/twitter', {json: true}, (err, res, body) => {
        console.log('Twitter:');
        if (err) { 
            console.log('Error: ', err); 
        }
        console.log(body);
    });

    request('https://takehome.io/facebook', {json: true}, (err, res, body) => {
        console.log('Facebook:');
        if (err) { 
            console.log('Error: ', err); 
        }
        console.log(body);
    });

    request('https://takehome.io/instagram', {json: true}, (err, res, body) => {
        console.log('Instagram:');
        if (err) { 
            console.log('Error: ', err); 
        }
        console.log(body);
    });

    res.json(globalResponse);
});

app.listen(3000, function () {
    console.log('Social Network Aggregator, at your service ...');
});
