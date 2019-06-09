'use strict';

const express = require('express');
const requestPromise = require('request-promise');
const app = express();

app.use(express.static('public'));


// Set DEBUG=false to quiet output to the console.
function log(...args) {
    const DEBUG = true;
    if (DEBUG) {
        console.log(...args);
    }
}


let globalResponse = {twitter: [], facebook: [], instagram: []};

// Helper function: performs a request to the given social media API,
// and returns a Promise encapsulating the response.
function requestSocialMedia(media) {
    return requestPromise(`https://takehome.io/${media}`, {json: true})
        .then(function(body) {
            log(`${media}:`);
            log(body);
            globalResponse[media] = body;
        })
        .catch(function(err) {
            log(`Error from ${media}: `, err.message); 
            globalResponse[media] = ['API Error: ' + err];
        });
}

// Default home route: performs 3 requests asynchronously to the different
// social-media APIs, then waits for all of them to finish before returning the results.
// If an endpoint returns an error instead of valid results, the error is injected into the results,
// prefixed with "API Error".
app.get('/', function (req, res) {
    log('-------------------------------------------------------');
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
