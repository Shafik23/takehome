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
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Social Network Aggregator, at your service ...');
});
