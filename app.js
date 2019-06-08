"use strict";

const fs = require('fs');
const express = require('express');
const request = require('request');
const requestPromise = require('request-promise');
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


// Default home route: performs 3 requests asynchronously to the different
// social-media APIs, then waits for all of them to finish before returning the results.
app.get('/', function (req, res) {
    const r1 = requestPromise('https://takehome.io/twitter')
        .then(function(body) {
            log('Twitter:');
            log(body);
            globalResponse.twitter = body;
        })
        .catch(function(err) {
            log('Error: ', err); 
            globalResponse.twitter = ['Error: ' + err];
        });

    const r2 = requestPromise('https://takehome.io/facebook')
        .then(function(body) {
            log('Facebook:');
            log(body);
            globalResponse.facebook = body;
        })
        .catch(function(err) {
            log('Error: ', err); 
            globalResponse.facebook = ['Error: ' + err];
        });

    const r3 = requestPromise('https://takehome.io/instagram')
        .then(function(body) {
            log('Instagram:');
            log(body);
            globalResponse.instagram = body;
        })
        .catch(function(err) {
            log('Error: ', err); 
            globalResponse.instagram = ['Error: ' + err];
        });


    Promise.all([r1, r2, r3]).then(function() {
        res.json(globalResponse);
    });
});


app.listen(3000, function () {
    log('Social Network Aggregator, at your service ...');
});
