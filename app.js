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


// Helper function: performs a request to the given social media API,
// and returns a Promise encapsulating the response.
function requestSocialMedia(media) {
    const p = requestPromise(`https://takehome.io/${media}`, {json: true})
        .then(function(body) {
            log(`${media}:`);
            log(body);
            globalResponse[media] = body;
        })
        .catch(function(err) {
            log(`Error ${media}: `, err.message); 
            globalResponse[media] = ['API Error: ' + err];
        });

    return p;
}

// Default home route: performs 3 requests asynchronously to the different
// social-media APIs, then waits for all of them to finish before returning the results.
app.get('/', function (req, res) {
    Promise.all([
        requestSocialMedia('twitter'),
        requestSocialMedia('facebook'),
        requestSocialMedia('instagram')
    ]).then(function() {
        res.json(globalResponse);
    });
});


app.listen(3000, function () {
    log('Social Network Aggregator, at your service ...');
});
